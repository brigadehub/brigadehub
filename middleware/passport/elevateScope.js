var passport = require('passport')

module.exports = function (req, res, next) {
  var scopes = req.query.scopes.split(',')
  return passport.authenticate('github', { scope: scopes })(req, res, next)
}
