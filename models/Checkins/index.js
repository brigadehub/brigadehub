var mongoose = require('mongoose')

const Users = require('../Users')

const schema = require('./schema')
const syncUser = require('./syncUser')

var checkinSchema = new mongoose.Schema(schema)

checkinSchema.post('save', function (doc, next) {
  // check username presence + for corresponding user
  if (!doc.githubUsername || !doc.githubUsername.length) return next()
  Users.findOne({ username: doc.githubUsername }, (err, user) => {
    if (err) throw err
    if (!user) user = new Users()
    syncUser(doc, user).then(next).catch((err)=>{
      console.log(err)
      next()
    })
  })
})

module.exports = mongoose.model('Checkins', checkinSchema)
