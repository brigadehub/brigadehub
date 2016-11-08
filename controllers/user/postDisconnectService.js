/**
 *  Dependencies
 */

var _ = require('lodash')
var Users = require('models/Users')

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/auth/disconnect/:service',
  authenticated: true,
  middleware: [],
  controller: postDisconnectService
}

/**
 *  Controller
 */

function postDisconnectService (req, res, next) {
  var service = req.params.service
  if (service === 'github') {
    req.flash('errors', { msg: 'Cannot disconnect Github account. Delete brigadehub account if you wish to disconnect.' })
    return res.redirect('/account')
  }
  console.log('removing', service, 'service')
  Users.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err)
    }
    user.tokens = _.reject(user.tokens, { kind: service })
    user.save(function (err) {
      if (err) {
        return next(err)
      }
      req.flash('success', { msg: 'Disconnected ' + service + ' service.' })
      res.redirect('/account')
    })
  })
}
