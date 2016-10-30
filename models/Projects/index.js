var mongoose = require('mongoose')
var Users = require('../Users')

const schema = require('./schema')
const fetchGithubRepos = require('./fetchGithubRepos')

var projectsSchema = new mongoose.Schema(schema)

projectsSchema.statics.fetchGithubRepos = fetchGithubRepos
projectsSchema.pre('save', function(project, next) {
  const saveUsersCalls = []
  if(project.leads && project.leads.length) {

  }
  next(null, project)
})
projectsSchema.post('find', function(projects, next) {
  const fetchMemberCalls = []
  for (index in projects) {
    const project = projects[index]
    fetchMemberCalls.push(fetchMembers(project, index))
  }
  Promise.all(fetchMemberCalls).then((results) => {
    for (resultIndex in results) {
      const result = results[resultIndex]
      projects[result.index].leads = result.leads
      projects[result.index].members = result.members
    }
    next(null, projects)
  }).catch((err) => {
    next(err)
  })
});
projectsSchema.post('findOne', function(project, next) {
  const thisSlug = project.id
  fetchMembers(project).then(function(results){
    project.leads = results.leads
    project.members = results.members
    next(null, project)
  }).catch((err) => {
    next(err)
  })
});
function fetchMembers (project, index) {
  return new Promise((resolve, reject) => {
    Users.find({ 'teams.project': project.id }, (err, members) => {
      if (err) return reject(err)
      console.log( project.id,'members', members.length)
      Users.find({ 'teams.lead': project.id }, (err, leads) => {
        if (err) return next(err)
        console.log( project.id,'leads', leads.length)
        resolve({leads: leads, members: members, index: index})
      })
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
}
module.exports = mongoose.model('Projects', projectsSchema)
