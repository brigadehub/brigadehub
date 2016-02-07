var _ = require('lodash')
var async = require('async')
var crypto = require('crypto')
var nodemailer = require('nodemailer')
var passport = require('passport')
var User = require('../models/User')

/**
 * GET /login
 * Login page.
 */
exports.getLogin = function (req, res) {
  if (req.user) {
    return res.redirect('/')
  }
  res.render(res.locals.brigade.theme.slug+'/views/account/login', {
    title: 'Login',
    brigade: res.locals.brigade
  })
}

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = function (req, res, next) {
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

/**
 * GET /logout
 * Log out.
 */
exports.getLogout = function (req, res) {
  req.logout()
  res.redirect('/')
}

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = function (req, res) {
  res.render(res.locals.brigade.theme.slug+'/views/account/profile', {
    title: 'Account Management',
    brigade: res.locals.brigade
  })
}

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = function (req, res, next) {
  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err)
    }
    user.email = req.body.email || ''
    user.profile.name = req.body.name || ''
    user.profile.gender = req.body.gender || ''
    user.profile.location = req.body.location || ''
    user.profile.website = req.body.website || ''
    user.save(function (err) {
      if (err) {
        return next(err)
      }
      req.flash('success', { msg: 'Profile information updated.' })
      res.redirect('/account')
    })
  })
}

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function (req, res, next) {
  User.remove({ _id: req.user.id }, function (err) {
    if (err) {
      return next(err)
    }
    req.logout()
    req.flash('info', { msg: 'Your account has been deleted.' })
    res.redirect('/')
  })
}

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = function (req, res, next) {
  var provider = req.params.provider
  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err)
    }
    user[provider] = undefined
    user.tokens = _.reject(user.tokens, function (token) { return token.kind === provider; })
    user.save(function (err) {
      if (err) return next(err)
      req.flash('info', { msg: provider + ' account has been unlinked.' })
      res.redirect('/account')
    })
  })
}

/**
 * GET /login/edit
 * Edit Login page.
 */
exports.getLoginEdit = function (req, res) {
  res.render(res.locals.brigade.theme.slug+'/views/account/login-edit', {
    title: 'Login Edit',
    brigade: res.locals.brigade
  })
}

/**
 * POST /login/edit
 * Update login page content
 */
exports.postLoginEdit = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/login')
  }
  res.send('yo')
}
