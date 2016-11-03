/**
 *  Dependencies
 */

var Users = require('models/Users')

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/account/profile',
  authenticated: true,
  middleware: [],
  controller: postUpdateProfile
}

/**
 *  Controller
 */

function postUpdateProfile (req, res, next) {
  Users.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err)
    }
    user.email = req.body.email || ''
    user.profile.name = req.body.name || ''
    user.profile.gender = req.body.gender || ''
    user.profile.location = req.body.location || ''
    user.profile.website = req.body.website || ''
    user.profile.position = req.body.position || ''
    user.profile.showcontact = req.body['showcontact'] === 'on'
    user.save(function (err) {
      if (err) {
        return next(err)
      }
      req.flash('success', { msg: 'Profile information updated.' })
      res.redirect('/account')
    })
  })
}
