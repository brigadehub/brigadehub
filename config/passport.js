var _ = require('lodash')
var passport = require('passport')
// var request = require('request')
var LocalStrategy = require('passport-local').Strategy
var GitHubStrategy = require('passport-github').Strategy
var MeetupStrategy = require('passport-meetup').Strategy
// var OpenIDStrategy = require('passport-openid').Strategy
// var OAuthStrategy = require('passport-oauth').OAuthStrategy
// var OAuth2Strategy = require('passport-oauth').OAuth2Strategy

var User = require('../models/Users')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

/**
 * Sign in with GitHub.
 */
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ github: profile.id }, function (err, existingUser) {
      if (err) console.error(err)
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
        done(err)
      } else {
        User.findById(req.user.id, function (err, user) {
          if (err) console.error(err)
          user.github = profile.id
          user.username = profile.username
          user.tokens.push({ kind: 'github', accessToken: accessToken })
          user.profile.name = user.profile.name || profile.displayName
          user.profile.picture = user.profile.picture || profile._json.avatar_url
          user.profile.location = user.profile.location || profile._json.location
          user.profile.website = user.profile.website || profile._json.blog
          User.count({}, function (err, count) {
            if (err) console.error(err)
            if (!count) {
              user.roles = {
                read: true,
                blog: true,
                project: true,
                lead: true,
                core: true,
                coreLead: true,
                superAdmin: true
              }
              user.teams.core = ['executive']
              user.teams.projects = ['website']
            }
            user.save(function (err) {
              if (err) console.error(err)
              req.flash('info', { msg: 'GitHub account has been linked.' })
              done(err, user)
            })
          })
        })
      }
    })
  } else {
    User.findOne({ github: profile.id }, function (err, existingUser) {
      if (err) console.error(err)
      if (existingUser) {
        return done(null, existingUser)
      }
      User.findOne({ email: profile._json.email }, function (err, existingEmailUser) {
        if (err) console.error(err)
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' })
          done(err)
        } else {
          var user = new User()
          user.email = profile._json.email
          user.github = profile.id
          user.username = profile.username
          user.tokens.push({ kind: 'github', accessToken: accessToken })
          user.profile.name = profile.displayName
          user.profile.picture = profile._json.avatar_url
          user.profile.location = profile._json.location
          user.profile.website = profile._json.blog
          User.count({}, function (err, count) {
            if (err) console.error(err)
            if (!count) {
              user.roles = {
                read: true,
                blog: true,
                project: true,
                lead: true,
                core: true,
                coreLead: true,
                superAdmin: true
              }
              user.teams.core = ['executive']
              user.teams.projects = ['website']
            }
            user.save(function (err) {
              if (err) console.error(err)
              done(err, user)
            })
          })
        }
      })
    })
  }
}))

/**
 * Link Meetup account
 */
passport.use(new MeetupStrategy({
  consumerKey: process.env.MEETUP_KEY,
  consumerSecret: process.env.MEETUP_SECRET,
  callbackURL: '/auth/meetup/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    console.log('req.user exists', profile)
    User.findById(req.user.id, function (err, user) {
      if (err) console.error(err)
      user.tokens.push({ kind: 'meetup', accessToken: accessToken })
      user.save(function (err) {
        if (err) console.error(err)
        req.flash('info', { msg: 'Meetup account has been linked.' })
        done(err, user)
      })
    })
  } else {
    console.log("req.user doesn't exist")
    req.flash('info', { msg: 'You must be logged in to link your Meetup account.' })
    done('ERROR')
  }
}))

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  email = email.toLowerCase()
  User.findOne({ email: email }, function (err, user) {
    if (err) console.error(err)
    if (!user) {
      return done(null, false, { message: 'Email ' + email + ' not found' })
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) console.error(err)
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid email or password.' })
      }
    })
  })
}))

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
  var provider = req.path.split('/').slice(-1)[0]

  if (_.find(req.user.tokens, { kind: provider })) {
    next()
  } else {
    res.redirect('/auth/' + provider)
  }
}
