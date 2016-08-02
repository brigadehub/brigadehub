var Brigade = require('../models/Brigade')

/**
 * GET /brigade
 * Brigade page.
 */
exports.getBrigade = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/brigade', {
    view: 'brigade-manage',
    title: 'Brigade',
    brigade: res.locals.brigade
  })
}

/**
 * POST /brigade
 * Sign in using email and password.
 */
exports.postBrigade = function (req, res, next) {
  /* req.assert('name', 'Password cannot be blank').notEmpty()
  req.assert('slug', 'Slug cannot be blank').notEmpty()
  req.assert('github', 'Github Group cannot be blank').notEmpty()
  req.assert('theme-slug', 'Theme cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/brigade')
  } */
  // console.log(req.body)
  res.locals.brigade.name = req.body.name
  res.locals.brigade.location.general = req.body.location
  res.locals.brigade.url = req.body.url
  res.locals.brigade.heroImage = req.body.heroImage
  res.locals.brigade.copy.tagline = req.body.tagline
  res.locals.brigade.theme.logo = req.body.logo
  res.locals.brigade.theme.slug = req.body['theme-slug']
  Brigade.find({slug: res.locals.brigade.slug}, function (err, results) {
    if (err) {
      console.error(err)
      req.flash('error', { msg: 'An error has occurred. Check console.' })
    }
    var thisBrigade = results[0]
    if (req.body.name) { // brigade form updated
      thisBrigade.name = req.body.name
      thisBrigade.location.general = req.body.location
      thisBrigade.location.timezone = req.body.timezone
      thisBrigade.url = req.body.url
      thisBrigade.heroImage = req.body.heroImage || 'https://i.imgur.com/m7omd0N.jpg'
      thisBrigade.copy.tagline = req.body.tagline
      thisBrigade.slack = req.body.slack
      thisBrigade.slackcount = req.body.slackcount || 0
      thisBrigade.brigadecount = req.body.brigadecount || 0
      thisBrigade.github = req.body.github.toLowerCase()
      thisBrigade.blog.jekyll = req.body['blog-jekyll'].toLowerCase()
      thisBrigade.slug = req.body.github.toLowerCase()
      thisBrigade.meetup = req.body.meetupurl
      thisBrigade.checkIn.day = req.body.checkinday
      thisBrigade.checkIn.urlLink = req.body.checkinurl
      thisBrigade.copy.description = req.body.description
    } else if (req.body['theme-slug']) { // theme updated
      thisBrigade.theme.slug = req.body['theme-slug']
      thisBrigade.theme.logo = req.body.logo
      thisBrigade.theme.page.title = req.body['show-title'] === 'on'
      thisBrigade.theme.page.events = req.body['show-events'] === 'on'
      thisBrigade.theme.page.projects = req.body['show-projects'] === 'on'
      thisBrigade.theme.page.blog = req.body['show-blog'] === 'on'
      thisBrigade.theme.page.about = req.body['show-about'] === 'on'
      thisBrigade.theme.page.login = req.body['show-login'] === 'on'
      req.body['sponsors'] = req.body['sponsors'] || []
      var sponsors = req.body['sponsors'].filter(function (sponsor, index) {
        if (req.body['mainsponsor'] === String(index)) {
          sponsor.main = true
        } else {
          sponsor.main = false
        }
        if (!sponsor.delete) {
          return sponsor
        }
      })
      thisBrigade.sponsors = sponsors
      if (req.body['new-sponsor'].name || req.body['new-sponsor'].link || req.body['new-sponsor'].image) {
        if (!(req.body['new-sponsor'].name) || !(req.body['new-sponsor'].link) || !(req.body['new-sponsor'].image)) {
          req.flash('errors', { msg: 'Please make sure that all three fields for your new sponsor link are filled out.' })
        } else {
          thisBrigade.sponsors.push(req.body['new-sponsor'])
        }
      }
      req.body['externals'] = req.body['externals'] || []
      var links = req.body['externals'].filter(function (link) {
        if (!link.delete) {
          return link
        }
      })
      thisBrigade.theme.page.external = links
      if (req.body['new-external'].name || req.body['new-external'].link) {
        if (!(req.body['new-external'].name) || !(req.body['new-external'].link)) {
          req.flash('errors', { msg: 'Please make sure that all three fields for your new external link are filled out.' })
        } else {
          thisBrigade.theme.page.external.push(req.body['new-external'])
        }
      }
      req.body['redirects'] = req.body['redirects'] || []
      var redirects = req.body['redirects'].filter(function (link) {
        if (!link.delete) {
          return link
        }
      })
      thisBrigade.redirects = redirects
      if (req.body['new-redirect'].endpoint.length || req.body['new-redirect'].destination.length) {
        if (!(req.body['new-redirect'].endpoint) || !(req.body['new-redirect'].destination)) {
          req.flash('errors', { msg: 'Please make sure that all fields for your new redirect link are filled out.' })
        } else {
          thisBrigade.redirects.push(req.body['new-redirect'])
        }
      }
    } else { // social media keys updated
      thisBrigade.auth.github.clientId = req.body['github-client-id']
      thisBrigade.auth.github.clientSecret = req.body['github-client-secret']
      thisBrigade.auth.meetup.consumerKey = req.body['meetup-client-id']
      thisBrigade.auth.meetup.consumerSecret = req.body['meetup-client-secret']
      thisBrigade.auth.email.user = req.body['emailuser']
      thisBrigade.auth.email.password = req.body['emailpass']
    }
    thisBrigade.save(function (err, results) {
      if (err) {
        console.error(err)
        req.flash('error', { msg: 'An error has occurred. Check console.' })
      }
      req.flash('success', { msg: "Success! You've updated your brigade." })
      res.redirect('/brigade')
    })
  })
}
