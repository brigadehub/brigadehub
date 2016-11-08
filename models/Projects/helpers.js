var request = require('request')
var _ = require('lodash')
var linkHeaderParser = require('link-header-parser')
var defaultHeaders = require('../../config/defaultGithubAPIHeaders')
var slug = require('slug')

module.exports.getRepos = function getRepos (url, aggregate, user, callback) {
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
module.exports.getRepoCivicJson = function getRepoCivicJson (url, user, callback) {
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
module.exports.getRepoREADME = function getRepoREADME (url, user, callback) {
  var headers = _.cloneDeep(defaultHeaders)
  headers['Authorization'] += user.tokens[0].accessToken
  var options = {
    url: url,
    headers: headers
  }
  request(options, function (err, response, body) {
    if (err) return callback(err)
    if (!err && response.statusCode === 200) {
      var readme
      try {
        var parsed = JSON.parse(body)
        var rm = new Buffer(parsed.content, 'base64')
        readme = rm.toString()
        console.log('readme', readme)
      } catch (e) {
        console.warn('Error occured', e)
      }
      return callback(null, readme)
    }
    callback({msg: 'Status Code not 200', response: response, body: body})
  })
}
module.exports.createUpdateProjectData = function createUpdateProjectData (project, original, brigade) {
  console.log('readme', project.readme)
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

  original.thumbnailUrl = project.json.thumbnailUrl || 'http://i.imgur.com/2lHqtJ7.png'
  if (original.thumbnailUrl.indexOf('placeholdit') > -1) {
    original.thumbnailUrl = 'http://i.imgur.com/2lHqtJ7.png'
  }
  original.bannerUrl = project.json.bannerUrl || 'http://i.imgur.com/2lHqtJ7.png'
  if (original.thumbnailUrl.indexOf('placeholdit') > -1) {
    original.thumbnailUrl = 'http://i.imgur.com/2lHqtJ7.png'
  }
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
  original.geography = original.geography || brigade.location.general
  original.contact = original.contact || []
  original.partners = original.partners || []
  original.partners = original.partners.concat(project.json.partners)
  original.partners = _.uniq(original.partners)
  original.keywords = original.keywords || []
  original.keywords = original.keywords.concat(project.json.keywords)
  original.keywords = original.keywords.concat(project.json.tags)
  original.keywords = _.uniq(original.keywords)
  original.links = original.links || []
  original.links = original.links.concat(project.json.links)
  original.links = _.uniq(original.links)
  original.content = original.content && original.content.length ? original.content : project.readme
  return original
}
