'use strict';

var dbm;
var type;
var seed;

var connect = require('../helpers/migrationConnect')

var Brigade = require('../models/Brigade')

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, cb) {
  return connect(function (err, disconnect) {
    if (err) return disconnect(cb, err)
    Brigade.findOne({}, function (err, brigade) {
      if (err) return disconnect(cb, err)
      if (!brigade.theme.public) {
        brigade.theme.public = 'c4sf'
        brigade.theme.admin = 'c4sf'
        return brigade.save(function (err, b) {
          disconnect(cb, err)
        })
      }
      disconnect(cb)
    })
  })
};

exports.down = function(db, cb) {
  return connect(function (err, disconnect) {
    if (err) return disconnect(cb, err)
    Brigade.findOne({}, function (err, brigade) {
      if (err) return disconnect(cb, err)
      if (brigade.theme.public) {
        delete brigade.theme.public
        delete brigade.theme.admin
        return brigade.save(function (err, b) {
          disconnect(cb, err)
        })
      }
      disconnect(cb)
    })
  })
};

exports._meta = {
  "version": 1
};
