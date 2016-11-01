const helpers = require('./helpers')

const getRepos = helpers.getRepos
const getRepoCivicJson = helpers.getRepoCivicJson
const getRepoREADME = helpers.getRepoREADME
const createUpdateProjectData = helpers.createUpdateProjectData

module.exports = function fetchGithubRepos (brigade, user, cb) {
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
            var json = results
            var readmeUrl = repo.contents_url.replace('{+path}', 'README.md')
            getRepoREADME(readmeUrl, user, function (err, results) {
              if (err) console.error(err)
              resolve({repo: repo, json: json, readme: results})
            })
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
