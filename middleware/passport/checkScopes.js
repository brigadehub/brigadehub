var _ = require('lodash')
var User = require('models/Users')

module.exports = function (scopes) {
  return function (req, res, next) {
    var valid = true
    _.forEach(scopes, function (scope) {
      if (req.user.scopes.indexOf(scope) < 0) {
        valid = false
      }
    })
    if (!valid) {
      // Needs Additional scopes. Save url, auth more.
      return User.findById(req.user.id, function (err, user) {
        if (err) console.error(err)
        user.postAuthLink = req.url
        user.save(function (err) {
          if (err) console.error(err)
          var scopesString = scopes.join(',')
          res.redirect('/auth/github/elevate?scopes=' + scopesString)
        })
      })
    }
    next()
  }
}
