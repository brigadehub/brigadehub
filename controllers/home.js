/**
 * GET /
 * Home page.
 */
var Projects = require('../models/Projects')

function getProjects (res) {
  return new Promise(function (resolve, reject) {
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
      resolve(foundProjects)
    })
  })
}

exports.index = function (req, res) {
  console.log(req.user)
  getProjects(res).then(function (projects) {
    res.render(res.locals.brigade.theme.slug + '/views/home', {
      title: 'Home',
      brigade: res.locals.brigade,
      projects: projects
    })
  })
}
