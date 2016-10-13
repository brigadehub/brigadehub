
var mongodb = require('mongodb')

exports.up = function (db, next) {
  var events = db.collection('events')
  events.update({title: 'Event 1'}, {title: 'TEST'}, next)
}

exports.down = function (db, next) {
  var events = db.collection('events')
  events.update({title: 'Event 1'}, {title: 'TEST'}, next)
}
