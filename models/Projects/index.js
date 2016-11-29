var mongoose = require('mongoose')
var _ = require('lodash')
var Users = require('../Users')

const schema = require('./schema')
const fetchGithubRepos = require('./fetchGithubRepos')

var projectsSchema = new mongoose.Schema(schema)

projectsSchema.statics.fetchGithubRepos = fetchGithubRepos
projectsSchema.pre('save', function (next) {
  const project = this
  const saveContributorsCalls = []
  if (project.leads && project.leads.length) {
    for (let leadIndex in project.leads) {
      const lead = project.leads[leadIndex]
      saveContributorsCalls.push(saveContributor('lead', project, lead))
    }
  }
  if (project.members && project.members.length) {
    for (let memberIndex in project.members) {
      const member = project.members[memberIndex]
      saveContributorsCalls.push(saveContributor('project', project, member))
    }
  }
  Promise.all(saveContributorsCalls).then(function (results) {
    if (project.leads) delete project.leads
    if (project.members) delete project.members
    next()
  }).catch((err) => {
    console.error(err)
    next(err)
  })
})
projectsSchema.post('find', function (projects, next) {
  const fetchContributorCalls = []
  for (let index in projects) {
    const project = projects[index]
    fetchContributorCalls.push(fetchContributors(project, index))
  }
  Promise.all(fetchContributorCalls).then((results) => {
    for (let resultIndex in results) {
      const result = results[resultIndex]
      projects[result.index].leads = result.leads
      projects[result.index].members = result.members
    }
    next(null, projects)
  }).catch((err) => {
    next(err)
  })
})
projectsSchema.post('findOne', function (project, next) {
  fetchContributors(project).then(function (results) {
    project.leads = results.leads
    project.members = results.members
    next(null, project)
  }).catch((err) => {
    next(err)
  })
})
function fetchContributors (project, index) {
  return new Promise((resolve, reject) => {
    if (!project) return resolve({leads: [], members: [], index: index})
    Users.find({ 'teams.project': project.id }, (err, members) => {
      if (err) return reject(err)
      Users.find({ 'teams.lead': project.id }, (err, leads) => {
        if (err) return reject(err)
        resolve({leads: leads, members: members, index: index})
      })
    })
  })
}
function saveContributor (type, project, contributorUsername) {
  return new Promise((resolve, reject) => {
    Users.findOne({ username: contributorUsername }, (err, member) => {
      if (err) return reject(err)
      member.teams[type].push(project.id)
      if (project.oldId !== project.id) member.teams[type] = _.without(member.teams[type], project.oldId)
      member.teams[type] = _.uniq(member.teams[type])
      member.save(function (err, member) {
        if (err) return reject(err)
        resolve(member)
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
        if (err) console.error(err)
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
