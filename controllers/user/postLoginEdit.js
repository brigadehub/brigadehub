/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/login/edit',
  authenticated: true,
  roles: [
    'core',
    'superAdmin'
  ],
  middleware: [],
  controller: postLoginEdit
}

/**
 *  Controller
 */

function postLoginEdit (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/login')
  }
  res.send('yo')
}
