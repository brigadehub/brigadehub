var mongoose = require('mongoose')
module.exports = function(cb){
  mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI, function (err) {
    if (err) return cb(new Error(err))
    cb(null, disconnect)
  })
  mongoose.connection.on('error', function (err) {
    console.log('There was an error while trying to connect!')
    cb(new Error(err), disconnect)
  })
}

function disconnect(cb, err) {
  return mongoose.connection.close(function () {
    return cb(err)
  })
}
