/**
 * GET /
 * Home page.
 */

var Projects = require('../models/Projects')
var Events = require('../models/Events')
var moment = require('moment')
require('moment-timezone')

var NUM_PROJECTS_SHOWN = 6

exports.index = function (req, res) {
  console.log(req.user)
  var upcomingEvents = []
  Events.find({}, function (err, foundEvents) {
    if (err) console.error(err)
    for (var i = 0; i < 3; i++) {
      foundEvents[i].startDate = moment.unix(foundEvents[i].start).tz(res.locals.brigade.location.timezone).format('MMM DD')
      upcomingEvents.push(foundEvents[i])
    }
  }).sort({start: 1})
  Projects.find({brigade: res.locals.brigade.slug}, function (err, foundProjects) {
    if (err) console.error(err)
    var allKeywords = []
    foundProjects.forEach(function (project) {
      project.keywords.forEach(function (keyword) {
        if (allKeywords.indexOf(keyword) < 0) {
          allKeywords.push(keyword)
        }
      })
    })
    res.render(res.locals.brigade.theme.slug + '/views/home', {
      view: 'home',
      title: 'Home',
      brigade: res.locals.brigade,
      projects: foundProjects.splice(0, NUM_PROJECTS_SHOWN),
      events: upcomingEvents
    })
  })
}

exports.indexEdit = function (req, res) {
  console.log(req.user)
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home-edit',
    title: 'Edit Home',
    brigade: res.locals.brigade
  })
}
