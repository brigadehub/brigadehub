/**
 *  Dependencies
 */

var Users = require('models/Users')

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/users/new',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postUsersNew
}

/**
 *  Controller
 */

function postUsersNew (req, res) {
  Users.find({username: req.body.username, 'profile.name': req.body.name}, (err, foundUser) => {
    if (err) console.log(err)
    else if (foundUser.length > 0) {
      req.flash('errors', {msg: req.body.username + ' already exists'})
      res.redirect('/users/new')
    } else {
      var newUser = new Users(req.body)
      newUser.profile = {
        name: req.body.email || '',
        gender: req.body.gender || '',
        position: req.body.position || '',
        location: req.body.location || '',
        website: req.body.website || ''
      }
      newUser.roles = {
        read: req.body.read === 'read',
        blog: req.body.blog === 'blog',
        project: req.body.project === 'project',
        lead: req.body.lead === 'lead',
        core: req.body.core === 'core',
        coreLead: req.body.coreLead === 'coreLead',
        superAdmin: req.body.superAdmin === 'superAdmin'
      }

      console.log(newUser)
      newUser.save((err) => {
        if (err) console.error(err)
      })
      req.flash('success', {msg: 'Success! You have created a new user.'})
      res.redirect('/users/manage')
    }
  })
}
