module.exports = function syncUser (doc, user) {
  return new Promise((resolve, reject) => {
    if(!user.username) user.username = doc.username // handle new account creation
    user.name = doc.name
    user.teams.projects = [
      ...user.teams.projects,
      doc.projects
    ]
    user.lastCheckin = doc.date
    user.email = doc.email
    user.mailingList = doc.mailingList
    user.referredBy = doc.referredBy
    user.skills = doc.skills
    user.save(err => {
      if (err) return reject(err)
      resolve(doc)
    })
  })
}
