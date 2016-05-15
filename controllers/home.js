/**
 * GET /
 * Home page.
 */

var Projects = require('../models/Projects')
var Events = require('../models/Events')
var moment = require('moment')
var Posts = require('../models/Posts')
require('moment-timezone')

var NUM_PROJECTS_SHOWN = 6

exports.index = function (req, res) {
  console.log(req.user)
  Events.find({}, function (err, foundEvents) {
    if (err) console.error(err)
    foundEvents = foundEvents.filter(function (event) {
      return event.start >= moment().unix()
    }).map(function (event) {
      event.startDate = moment.unix(event.start).format('MMM DD')
      return event
    })
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
      Posts.find({}, function (err, foundPosts) {
        if (err) console.error(err)
        foundPosts = foundPosts.slice(0, 3).map(function (post) {
          post.date = moment.unix(post.unix).format('MMMM DD, YYYY')
          return post
        })
        res.render(res.locals.brigade.theme.slug + '/views/home', {
          view: 'home',
          title: 'Home',
          brigade: res.locals.brigade,
          projects: foundProjects.splice(0, NUM_PROJECTS_SHOWN),
          events: foundEvents.slice(0, 3),
          posts: foundPosts
        })
      }).sort({unix: -1})
    })
  }).sort({start: 1})
}

exports.indexEdit = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home-edit',
    title: 'Edit Home',
    brigade: res.locals.brigade
  })
}
