var _ = require('lodash');
var async = require('async');
var Brigade = require('../models/Brigade');

/**
 * GET /brigade
 * Brigade page.
 */
exports.getBrigade = function(req, res) {
  res.render(res.locals.brigade.theme.slug+'/views/brigade', {
    title: 'Brigade',
    brigade: res.locals.brigade
  });
};

/**
 * POST /brigade
 * Sign in using email and password.
 */
exports.postBrigade = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/brigade');
  }

  res.redirect('/brigade');
};
