var _ = require('lodash')
var passport = require('passport')
var Users = require('../models/Users')

module.exports = {
  /**
   * GET /login
   * Login page.
   */
  getLogin: function (req, res) {
    if (req.user) {
      return res.redirect('/')
    }
    res.render(res.locals.brigade.theme.slug + '/views/account/login', {
      view: 'login',
      title: 'Login',
      brigade: res.locals.brigade
    })
  },

  /**
   * POST /login
   * Sign in using email and password.
   */
  postLogin: function (req, res, next) {
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
  },

  /**
   * GET /logout
   * Log out.
   */
  getLogout: function (req, res) {
    req.logout()
    res.redirect('/')
  },

  /**
   * GET /account
   * Profile page.
   */
  getAccount: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/account/profile', {
      view: 'account-settings',
      title: 'Account Management',
      brigade: res.locals.brigade
    })
  },

  /**
   * POST /account/profile
   * Update profile information.
   */
  postUpdateProfile: function (req, res, next) {
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
  },

  /**
   * POST /account/delete
   * Delete user account.
   */
  postDeleteAccount: function (req, res, next) {
    if (req.body['verify-account-deletion-string'] === 'delete my account') {
      Users.remove({ _id: req.user.id }, function (err) {
        if (err) {
          return next(err)
        }
        req.logout()
        req.flash('info', { msg: 'Your account has been deleted.' })
        res.redirect('/')
      })
    } else {
      req.flash('info', { msg: 'You didn\'t type the required phrase, so your account was not deleted.' })
      res.redirect('back')
    }
  },

  /**
   * GET /account/unlink/:provider
   * Unlink OAuth provider.
   */
  getOauthUnlink: function (req, res, next) {
    var provider = req.params.provider
    Users.findById(req.user.id, function (err, user) {
      if (err) {
        return next(err)
      }
      user[provider] = undefined
      user.tokens = _.reject(user.tokens, function (token) { return token.kind === provider })
      user.save(function (err) {
        if (err) return next(err)
        req.flash('info', { msg: provider + ' account has been unlinked.' })
        res.redirect('/account')
      })
    })
  },

  /**
   * GET /login/edit
   * Edit Login page.
   */
  getLoginEdit: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/account/login-edit', {
      view: 'login-edit',
      title: 'Login Edit',
      brigade: res.locals.brigade
    })
  },

  /**
   * POST /login/edit
   * Update login page content
   */
  postLoginEdit: function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('password', 'Password cannot be blank').notEmpty()

    var errors = req.validationErrors()

    if (errors) {
      req.flash('errors', errors)
      return res.redirect('/login')
    }
    res.send('yo')
  },

  // ADMIN FUNCTIONS - USER MANAGEMENT
  /**
   * GET /users
   * List of User examples.
   */
  getUsers: function (req, res) {
    Users.find({}, function (err, foundUsers) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/users/index', {
        view: 'user-list',
        title: 'Users',
        brigade: res.locals.brigade,
        users: foundUsers
      })
    })
  },
  /**
   * GET /users/manage
   * Manage Users.
   */
  getUsersManage: function (req, res) {
    Users.find({}, function (err, foundUsers) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/users/manage', {
        view: 'user-list-manage',
        title: 'Manage Users',
        brigade: res.locals.brigade,
        users: foundUsers
      })
    })
  },
  /**
   * POST /users/manage
   * Update all Users.
   */
  postUsersManage: function (req, res) {
    Users.find({}, function (err, foundUsers) {
      if (err) console.log(err)
      for (var i = 0; i < foundUsers.length; i++) {
        if (req.body[foundUsers[i].username]) {
          var user = new Users(foundUsers[i])
          req.body[user.username].blogRole ? user.roles.blog = true : user.roles.blog = false
          req.body[user.username].projectRole ? user.roles.project = true : user.roles.project = false
          req.body[user.username].projectLeadRole ? user.roles.lead = true : user.roles.lead = false
          req.body[user.username].coreRole ? user.roles.core = true : user.roles.core = false
          req.body[user.username].coreLeadRole ? user.roles.coreLead = true : user.roles.coreLead = false
          req.body[user.username].superAdmin ? user.roles.superAdmin = true : user.roles.superAdmin = false
          user.save(function (err) {
            if (err) console.log(err)
          })
        }
      }
    })
    res.redirect('/users/manage')
  },
  /**
   * GET /users/new
   * New Users.
   */
  getUsersNew: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/users/new', {
      view: 'user-new',
      title: 'New Users',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /users/new
   * Submit New Users.
   */
  postUsersNew: function (req, res) {
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
  },

  /**
   * GET /users/:userID
   * Display User by ID.
   */
  getUsersID: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/users/user', {
      view: 'user',
      userId: req.params.userId,
      title: 'Users',
      brigade: res.locals.brigade
    })
  },
  /**
   * GET /users/:userID/settings
   * IDSettings Users.
   */
  getUsersIDSettings: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/users/settings', {
      view: 'user-settings',
      userId: req.params.userId,
      title: 'IDSettings Users',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /users/:userID/settings
   * Submit IDSettings Users.
   */
  postUsersIDSettings: function (req, res) {
    res.redirect('/users/:userID/settings')
  },
  /**
   * POST /users/sync
   * Sync Users.
   */
  postUsersSync: function (req, res) {
    Users.fetchGithubUsers(res.locals.brigade, req.user, function (results) {
      req.flash('success', { msg: 'Success! You have successfully synced users from Github.' })
      res.redirect('/users/manage')
    })
  },
  /**
   * POST /users/:userID/settings
   * Submit IDSettings Users.
   */
  postUsersIDSync: function (req, res) {
    res.redirect('/users/:userID/settings')
  },
  /**
   * Get /auth/disconnect/:service
   * Disconnect a passport service
   */
  disconnectService: function (req, res, next) {
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
}
