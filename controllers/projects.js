/**
 * Split into declaration and initialization for better startup performance.
 */

var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)
// markdown()

var Projects = require('../models/Projects')
var Users = require('../models/Users')

module.exports = {
  /**
   * GET /projects
   * List of Project examples.
   */
  getProjects: function (req, res) {
    var mongooseQuery = {brigade: res.locals.brigade.slug}
    // var page
    if (req.query.keyword) {
      mongooseQuery.keywords = req.query.keyword
    }
    if (req.query.need) {
      mongooseQuery.needs = req.query.need
    }
    // if (req.query.page) {
    //   page = req.query.page
    // }
    Projects.find({}, function (err, foundProjects) {
      if (err) console.error(err)
      var allKeywords = []
      var allNeeds = []
      foundProjects.forEach(function (project) {
        project.keywords.forEach(function (keyword) {
          if (allKeywords.indexOf(keyword) < 0) {
            allKeywords.push(keyword)
          }
        })
        project.needs.forEach(function (need) {
          if (allNeeds.indexOf(need) < 0) {
            allNeeds.push(need)
          }
        })
      })
      const totalProjects = foundProjects.length
      Projects.find(mongooseQuery, function (err, foundProjects) {
        if (err) console.error(err)
        if (!req.query.showall) {
          foundProjects = foundProjects.filter((project) => {
            console.log(project)
            return project.active
          })
        }
        res.render(res.locals.brigade.theme.slug + '/views/projects/index', {
          view: 'project-list',
          title: 'Projects',
          brigade: res.locals.brigade,
          projects: foundProjects,
          selectedKeyword: req.query.keyword,
          selectedNeed: req.query.need,
          keywords: allKeywords.sort(),
          needs: allNeeds.sort(),
          showingInactive: req.query.showall,
          totalProjects: totalProjects
        })
      })
    })
  },
  /**
   * GET /projects/manage
   * Manage Projects.
   */
  getProjectsManage: function (req, res) {
    Projects.find({brigade: res.locals.brigade.slug}, function (err, foundProjects) {
      if (err) console.error(err)
      console.log(foundProjects)
      res.render(res.locals.brigade.theme.slug + '/views/projects/manage', {
        view: 'project-list-manage',
        title: 'Manage Projects',
        brigade: res.locals.brigade,
        projects: foundProjects
      })
    })
  },
  /**
   * POST /projects/manage
   * Update all Projects.
   */
  postProjectsManage: function (req, res) {
    var mongooseQuery = {}
    //  if (!res.locals.user.isAdmin()) {
    //   //  mongooseQuery.author = res.locals.user.username
    //  }
    Projects.find(mongooseQuery, function (err, projects) {
      if (err) console.error(err)
      projects.reverse() // so that most recent are first
      projects.forEach(function (project) {
        var projectInfo = req.body[project.id]
        if (projectInfo.delete) {
          project.remove()
          return
        }
        project.name = projectInfo.name
        project.published = !!projectInfo.published
        project.active = !!projectInfo.active
        project.save(function (err) {
          if (err) {
            console.error(err)
            req.flash('errors', {msg: 'An Error occured while saving your projects.'})
            return res.redirect('/projects/manage')
          }
          req.flash('success', { msg: 'Success! Projects edited.' })
          return res.redirect('/projects/manage/')
        })
      })
    })
  },
  /**
   * GET /projects/new
   * New Projects.
   */
  getProjectsNew: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/projects/new', {
      view: 'project-new',
      title: 'New Projects',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /projects/new
   * Submit New Projects.
   */
  postProjectsNew: function (req, res) {
    var newProject = new Projects(req.body)
    newProject.id = res.locals.brigade.slug + '-' + req.body.name
    newProject.brigade = res.locals.brigade.slug
    newProject.team = []
    newProject.needs = []
    newProject.keywords = []
    if (req.body.team) {
      if (typeof req.body.team === 'string' && req.body.team.indexOf(',') > -1) {
        req.body.team.replace(/\s/g, '').split(',').forEach(function (member) {
          newProject.team.push(member)
        })
      } else if (typeof req.body.team === 'string') {
        newProject.team.push(req.body.team)
      } else {
        newProject.team = newProject.team.concat(req.body.team)
      }
    }
    if (req.body.needs) {
      if (typeof req.body.needs === 'string' && req.body.needs.indexOf(',') > -1) {
        req.body.needs.replace(/\s/g, '').split(',').forEach(function (need) {
          newProject.needs.push(need)
        })
      } else if (typeof req.body.needs === 'string') {
        newProject.needs.push(req.body.needs)
      } else {
        newProject.needs = newProject.needs.concat(req.body.needs)
      }
    }
    if (req.body.keywords) {
      if (typeof req.body.keywords === 'string' && req.body.keywords.indexOf(',') > -1) {
        req.body.keywords.replace(/\s/g, '').split(',').forEach(function (keyword) {
          newProject.keywords.push(keyword)
        })
      } else if (typeof req.body.keywords === 'string') {
        newProject.keywords.push(req.body.keywords)
      } else {
        newProject.keywords = newProject.keywords.concat(req.body.keywords)
      }
    }
    newProject.save(function (err, newProject) {
      if (err) {
        console.error(err)
        req.flash('errors', {msg: 'An Error occured while creating your project.'})
        return res.redirect('/projects/new')
      }
      req.flash('success', {msg: 'Success! You have created a project.'})
      res.redirect(`/projects/${newProject.slug}`)
    })
  },

  /**
   * GET /projects/:projectID
   * Display Project by ID.
   */
  getProjectsID: function (req, res) {
    Projects.findOne({
      brigade: res.locals.brigade.slug,
      id: req.params.projectId
    }, function (err, foundProject) {
      if (err) console.error(err)
      if (foundProject === null) {
        res.redirect('/projects/')
        return
      }

      foundProject.content = md.render(foundProject.content)
      if (foundProject.contact.length) {
        Projects.fetchGitHubUsers(foundProject.contact, function (contactList) {
          res.render(res.locals.brigade.theme.slug + '/views/projects/project', {
            view: 'project',
            projectId: req.params.projectId,
            title: foundProject.name,
            brigade: res.locals.brigade,
            project: foundProject,
            contacts: contactList
          })
        })
      } else {
        res.render(res.locals.brigade.theme.slug + '/views/projects/project', {
          view: 'project',
          projectId: req.params.projectId,
          title: foundProject.name,
          brigade: res.locals.brigade,
          project: foundProject,
          contacts: []
        })
      }
    })
  },
  /**
   * GET /projects/:projectID/settings
   * IDSettings Projects.
   */
  getProjectsIDSettings: function (req, res) {
    Projects.find({'id': req.params.projectId}, function (err, foundProject) {
      if (err) console.log(err)
      Users.find({}, function (err, allUsers) {
        if (err) console.error(err)
        res.render(res.locals.brigade.theme.slug + '/views/projects/settings', {
          view: 'project-settings',
          project: foundProject[0],
          users: allUsers,
          title: 'IDSettings Projects',
          brigade: res.locals.brigade
        })
      })
    })
  },
  /**
   * POST /projects/:projectID/settings
   * Submit IDSettings Projects.
   */
  postProjectsIDSettings: function (req, res) {
    Projects.find({'id': req.params.projectId}, function (err, foundProject) {
      if (err) console.log(err)
      var thisProject = foundProject[0]
      if (thisProject) {
        console.log(req.body)
        thisProject.categories = []
        thisProject.needs = []
        thisProject.team = []
        thisProject.data = []
        thisProject.keywords = []
        thisProject.name = req.body.title || ''
        thisProject.id = slug(thisProject.name)
        thisProject.active = req.body.active || false
        console.log(req.body.active)
        thisProject.status = req.body.status || ''
        thisProject.politicalEntity = req.body.politicalEntity || ''
        thisProject.geography = req.body.geography || ''
        thisProject.homepage = req.body.homepage || ''
        thisProject.repository = req.body.repository || ''
        thisProject.description = req.body.description || ''
        thisProject.content = req.body.content || ''
        thisProject.thumbnailUrl = req.body.thumbnailUrl || ''
        thisProject.bannerUrl = req.body.bannerUrl || ''
        if (req.body.team) {
          if (typeof req.body.team === 'string' && req.body.team.indexOf(',') > -1) {
            req.body.team.replace(/\s/g, '').split(',').forEach(function (member) {
              thisProject.team.push(member)
            })
          } else if (typeof req.body.team === 'string') {
            thisProject.team.push(req.body.team)
          } else {
            thisProject.team = thisProject.team.concat(req.body.team)
          }
        }
        if (req.body.needs) {
          if (typeof req.body.needs === 'string' && req.body.needs.indexOf(',') > -1) {
            req.body.needs.replace(/\s/g, '').split(',').forEach(function (need) {
              thisProject.needs.push(need)
            })
          } else if (typeof req.body.needs === 'string') {
            thisProject.needs.push(req.body.needs)
          } else {
            thisProject.needs = thisProject.needs.concat(req.body.needs)
          }
        }
        if (req.body.keywords) {
          if (typeof req.body.keywords === 'string' && req.body.keywords.indexOf(',') > -1) {
            req.body.keywords.replace(/\s/g, '').split(',').forEach(function (keyword) {
              thisProject.keywords.push(keyword)
            })
          } else if (typeof req.body.keywords === 'string') {
            thisProject.keywords.push(req.body.keywords)
          } else {
            thisProject.keywords = thisProject.keywords.concat(req.body.keywords)
          }
        }
        return thisProject.save(function (err) {
          if (err) console.log(err)
          req.flash('success', { msg: 'Success! You have updated your project.' })
          res.redirect('/projects/' + thisProject.id + '/settings')
        })
      }
      req.flash('errors', { msg: 'Could not find project with id ' + req.params.projectId })
      res.redirect('/projects/manage')
    })
  },
  /**
   * POST /projects/sync
   * Sync Projects.
   */
  postProjectsSync: function (req, res) {
    Projects.fetchGithubRepos(res.locals.brigade, req.user, function (results) {
      req.flash('success', { msg: 'Success! You have successfully synced projects from Github.' })
      res.redirect('/projects/manage')
    })
  },
  /**
   * POST /projects/delete
   * Delete a project
   */
  postDeleteProject: function (req, res) {
    Projects.remove({id: req.params.projectId}, function (err) {
      if (err) {
        console.log(err)
        return res.redirect('/projects/' + req.params.projectId)
      } else {
        req.flash('success', {msg: 'Your project was deleted.'})
        return res.redirect('/projects/')
      }
    })
  },
  /**
   * POST /projects/:projectID/settings
   * Submit IDSettings Projects.
   */
  postProjectsIDSync: function (req, res) {
    res.redirect('projects/:projectID/settings')
  }
}
