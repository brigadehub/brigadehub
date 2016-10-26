var mongoose = require('mongoose')

const Users = require('../Users')

const schema = require('./schema')
const syncUser = require('./syncUser')
const createUser = require('./createUser')

var checkinSchema = new mongoose.Schema(schema)

checkinSchema.post('save', function (doc, next) {
  // check username presence + for corresponding user
  if (!doc.username || !doc.username.length) return next()
  Users.findOne({ username: doc.username }, (err, user) => {
    if (err) throw err
    if (!user) user = new Users()
    syncUser(doc, user).then(next)
  })
})

module.exports = mongoose.model('Checkins', checkinSchema)
