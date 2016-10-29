const _ = require('lodash')

module.exports = function syncUser (doc, user) {
  return new Promise((resolve, reject) => {
    if (!user.username) user.username = doc.username // handle new account creation
    user.profile.name = doc.name || user.profile.name

    user.teams.project = user.teams.project.concat(doc.teams)
    user.teams.project = _.uniq(user.teams.project)
    user.teams.project = _.difference(user.teams.project, user.teams.lead)
    user.lastCheckin = doc.date
    user.email = doc.email
    user.mailingList = doc.mailingList
    user.referredBy = doc.referredBy || user.referredBy
    user.skills = doc.skills
    user.save((err) => {
      if (err) return reject(err)
      resolve(doc)
    })
  })
}
