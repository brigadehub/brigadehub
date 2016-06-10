var mongoose = require('mongoose')
var request = require('request')
var _ = require('lodash')
var linkHeaderParser = require('link-header-parser')
var Users = require('./Users')
var defaultHeaders = require('../config/defaultGithubAPIHeaders')
var slug = require('slug')

var projectsSchema = new mongoose.Schema({
  id: {type: String, default: ''}, // this is the slug - civic.sf.json + civic.dc.json
  brigade: {type: String, default: ''}, // this is the brigade the project currently belongs to - civic.sf.json

  /* Standard BetaNYC civic.json, used by CFAPI */

  status: {type: String, default: ''}, // civic.json + civic.dc.json - proposed, ideation, alpha, beta, production, archival
  thumbnailUrl: {type: String, default: 'http://i.imgur.com/MRgvL1K.png'},
  bannerUrl: {type: String, default: 'http://i.imgur.com/MRgvL1K.png'},
  bornAt: {type: String, default: ''},
  geography: {type: String, default: ''},
  politicalEntity: {type: String, default: ''},
  type: {type: String, default: ''},
  needs: {type: Array, default: []},
  categories: {type: Array, default: []},

  /* Expanded Open DC civic.json */

  // id: {type:String, default:''}, // represented above
  name: {type: String, default: ''}, // Display title
  description: {type: String, default: ''},
  content: {type: String, default: ''},
  license: {type: String, default: ''},
  // status: {type:String, default:''}, // represented above
  homepage: {type: String, default: ''},
  repository: {type: String, default: ''},
  githubSlug: {type: String, default: ''},
  contact: {type: Array, default: []},
  team: {type: Array, default: []},
  partners: {type: Array, default: []}, // name, email, logo?
  data: {type: Array, default: []},
  keywords: {type: Array, default: []}, // simple strings
  links: {type: Array, default: []}, // simple strings
  videos: {type: Array, default: []}
})

projectsSchema.statics.fetchGithubRepos = function (brigade, user, cb) {
  var Projects = this
  var url = 'https://api.github.com/orgs/' + brigade.slug + '/repos'
  getRepos(url, [], user, function (err, aggregate) {
    if (err) console.error(err)
    // massage data, fetch civic.json files
    var promiseArray = []
    aggregate.forEach(function (repo) {
      function buildPromise (repo) {
        return new Promise(function (resolve, reject) {
          var civicJsonUrl = repo.contents_url.replace('{+path}', 'civic.json')
          getRepoCivicJson(civicJsonUrl, user, function (err, results) {
            if (err) console.error(err)

            resolve({repo: repo, json: results})
          })
        })
      }
      promiseArray.push(buildPromise(repo))
    })
    Promise.all(promiseArray)
      .then(function (results) {
        // update/save all in schema
        var mongooseActions = []
        results.forEach(function (project) {
          function buildPromise (project) {
            return new Promise(function (resolve, reject) {
              Projects.find({githubSlug: project.repo.name, brigade: brigade.slug}, function (err, foundProject) {
                if (err) console.error(err)
                if (!foundProject.length) {
                  console.log('creating', project.repo.name)
                  var projectData = createUpdateProjectData(project, {}, brigade)
                  var newProject = new Projects(projectData)
                  newProject.save(function (err) {
                    if (err) console.error(err)
                    resolve()
                  })
                } else { // project already exists, needs updating
                  console.log('updating', project.repo.name)
                  var thisProject = foundProject[0]
                  thisProject = createUpdateProjectData(project, thisProject, brigade)
                  thisProject.save(function (err) {
                    if (err) console.error(err)
                    resolve()
                  })
                }
              })
            })
          }
          mongooseActions.push(buildPromise(project))
        // search for previous schema
        })
        return Promise.all(mongooseActions)
          .then(function () {
            cb(null, results)
          })
          .catch(function (err) {
            throw err
          })
      })
      .catch(function (err) {
        console.error(err)
        cb(err)
      })
  })
}

projectsSchema.statics.publishToGithub = function (cb) {
  cb(null, 'isMatch')
}
projectsSchema.statics.fetchGitHubUsers = function (users, cb) {
  var promiseArray = []
  function getUser (username) {
    return new Promise(function (resolve, reject) {
      Users.findOne({'username': username}, function (err, foundUser) {
        if (err) console.log(err)
        if (foundUser) {
          resolve(foundUser)
        } else {
          resolve(username)
        }
      })
    })
  }
  users.forEach(function (user) {
    promiseArray.push(getUser(user))
  })
  Promise.all(promiseArray).then(function (contactList) {
    cb(contactList)
  })
//   return new Promise (function (resolve, reject) {
//     users.map(function (user) {
//       Users.findOne({'username': user}, function (err, foundUser) {
//         if (foundUser) {
//           console.log('ping')
//           user.email = foundUser.email
//           return user.email
//         } else {
//           return user
//         }
//       })
//     })
//     resolve(users)
//   })
}
module.exports = mongoose.model('Projects', projectsSchema)

function getRepos (url, aggregate, user, callback) {
  var headers = _.cloneDeep(defaultHeaders)
  headers['Authorization'] += user.tokens[0].accessToken
  var options = {
    url: url,
    headers: headers
  }
  request(options, function (err, response, body) {
    if (err) return callback(err, aggregate)
    if (!err && response.statusCode === 200) {
      var parsed = JSON.parse(body)
      aggregate = aggregate.concat(parsed)
      aggregate = _.uniq(aggregate)
      console.log('aggregate count', aggregate.length)
      // if there's a next link in header, call that recursively
      var linkHeader = linkHeaderParser(response.headers.link)
      if (linkHeader.next) {
        return getRepos(linkHeader.next.url, aggregate, user, callback)
      }
      return callback(null, aggregate)
    }
    callback({msg: 'Status Code not 200', response: response, body: body}, aggregate)
  })
}
function getRepoCivicJson (url, user, callback) {
  var headers = _.cloneDeep(defaultHeaders)
  headers['Authorization'] += user.tokens[0].accessToken
  var options = {
    url: url,
    headers: headers
  }
  request(options, function (err, response, body) {
    if (err) return callback(err)
    if (!err && response.statusCode === 200) {
      var civicJS
      try {
        var parsed = JSON.parse(body)
        var cj = new Buffer(parsed.content, 'base64')
        var civicJSON = cj.toString()
        civicJS = JSON.parse(civicJSON)
        console.log('civicJSON', civicJS)
      } catch (e) {
        console.warn('Error occured', e)
      }
      return callback(null, civicJS)
    }
    callback({msg: 'Status Code not 200', response: response, body: body})
  })
}
function createUpdateProjectData (project, original, brigade) {
  original = original || {}
  project.json = project.json || {}
  project.json.needs = project.json.needs || []
  project.json.categories = project.json.categories || []
  project.json.partners = project.json.partners || []
  project.json.data = project.json.data || []
  project.json.keywords = project.json.keywords || []
  project.json.tags = project.json.tags || []
  project.json.links = project.json.links || []
  project.json.contact = project.json.contact || []

  original.id = original.id ? slug(original.id) : slug(project.repo.name) // this is the slug - civic.sf.json + civic.dc.json
  original.githubSlug = project.repo.name // this is the slug - civic.sf.json + civic.dc.json
  original.brigade = brigade.slug // this is the slug - civic.sf.json + civic.dc.json
  original.status = project.json.status ? project.json.status.toLowerCase() : 'proposed' // civic.json + civic.dc.json - proposed, ideation, alpha, beta, production, archival

  original.thumbnailUrl = project.json.thumbnailUrl || 'http://i.imgur.com/MRgvL1K.png'
  original.bannerUrl = project.json.bannerUrl || 'http://i.imgur.com/MRgvL1K.png'
  original.bornAt = project.json.bornAt || brigade.name
  original.geography = project.json.geography || brigade.location.general
  original.politicalEntity = project.json.politicalEntity || ''
  original.type = project.json.type || ''
  original.needs = original.needs || []
  original.needs = original.needs.concat(project.json.needs)
  original.needs = _.uniq(original.needs)
  original.categories = original.categories || []
  original.categories = original.categories.concat(project.json.categories)
  original.categories = _.uniq(original.categories)
  original.name = project.json.name || project.repo.name // Display titl
  original.description = project.json.description || project.repo.description || 'A new project.'
  original.license = project.json.license || 'MIT'
  original.homepage = project.json.homepage || project.repo.homepage || project.repo.html_url
  original.repository = project.json.repository || project.repo.html_url
  original.geography = original.geography || []
  original.geography = original.geography.concat(project.json.geography)
  original.geography = _.uniq(original.geography)
  original.contact = original.contact || []
  original.partners = original.partners || []
  original.partners = original.partners.concat(project.json.partners)
  original.partners = _.uniq(original.partners)
  original.data = original.data || []
  original.data = original.data.concat(project.json.data)
  original.data = _.uniq(original.data)
  original.keywords = original.keywords || []
  original.keywords = original.keywords.concat(project.json.keywords)
  original.keywords = original.keywords.concat(project.json.tags)
  original.keywords = _.uniq(original.keywords)
  original.links = original.links || []
  original.links = original.links.concat(project.json.links)
  original.links = _.uniq(original.links)
  return original
}
