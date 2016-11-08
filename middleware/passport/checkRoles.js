var _ = require('lodash')

module.exports = function (roles) {
  return function (req, res, next) {
    var valid = false
    _.forEach(roles, function (role) {
      if (req.user.roles[role]) {
        valid = true
      }
    })
    if (!valid) {
      req.flash('errors', { msg: 'You are not authorized to view this page.' })
      var backURL = req.header('Referer') || '/'
      return res.redirect(backURL)
    }
    next()
  }
}
