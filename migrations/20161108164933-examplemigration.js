'use strict'

var dbm
var type
var seed

/**
  * This is an example migration
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db, cb) {
  // Migration to desired state should be placed here.
  // for how to use `db`, refer to the noSQL API section
  // of the db-migrate docs:
  // https://db-migrate.readthedocs.io/en/latest/API/NoSQL/#migrations-api-nosql

  // e.g. db.createCollection('pets', cb)
  cb()
}

exports.down = function (db, cb) {
  // Migration away from desired state
  // (reset to previous state) should be placed here.
  // All migrations should have an action that returns
  // the db to its original state

  // e.g. db.dropCollection('pets', cb)
  cb()
}

exports._meta = {
  'version': 1
}
