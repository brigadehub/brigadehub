/**
 * GET /
 * Home page.
 */

var Projects = require('../models/Projects')

var NUM_PROJECTS_SHOWN = 6

exports.index = function (req, res) {
  console.log(req.user)
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
      title: 'Home',
      brigade: res.locals.brigade,
      projects: foundProjects.splice(0, NUM_PROJECTS_SHOWN)
    })
  })
}
