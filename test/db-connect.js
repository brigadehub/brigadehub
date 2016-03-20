var mongoose = require('mongoose')

require('../dotenv.js')()

module.exports = function () {
  var db = mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI)
  db.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
    process.exit(1)
  })
  return db
}
