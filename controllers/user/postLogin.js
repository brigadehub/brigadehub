/**
 *  Dependencies
 */

var passport = require('passport')

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/login',
  middleware: [],
  controller: postLogin
}

/**
 *  Controller
 */

function postLogin (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/login')
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('errors', { msg: info.message })
      return res.redirect('/login')
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
}
