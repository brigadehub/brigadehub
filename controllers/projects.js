/**
 * Split into declaration and initialization for better startup performance.
 */

var slug = require('slug')
var markdown = require('marked')

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
    // if (req.query.page) {
    //   page = req.query.page
    // }
    Projects.find({}, function (err, foundProjects) {
      if (err) console.error(err)
      var allKeywords = []
      foundProjects.forEach(function (project) {
        project.keywords.forEach(function (keyword) {
          if (allKeywords.indexOf(keyword) < 0) {
            allKeywords.push(keyword)
          }
        })
      })
      Projects.find(mongooseQuery, function (err, foundProjects) {
        if (err) console.error(err)
        res.render(res.locals.brigade.theme.slug + '/views/projects/index', {
          view: 'project-list',
          title: 'Projects',
          brigade: res.locals.brigade,
          projects: foundProjects,
          selectedKeyword: req.query.keyword,
          keywords: allKeywords.sort()
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
    res.redirect('projects/manage')
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
    if (req.body.categories) {
      newProject.categories = req.body.categories.replace(/\s/g, '').split(',')
    }
    if (req.body.contact) {
      newProject.contact = req.body.contact.replace(/\s/g, '').split(',')
    }
    if (req.body.needs) {
      newProject.needs = req.body.needs.replace(/\s/g, '').split(',')
    }
    if (req.body.keywords) {
      newProject.keywords = req.body.keywords.replace(/\s/g, '').split(',')
    }
    if (req.body.data) {
      newProject.data = req.body.data.replace(/\s/g, '').split(',')
    }
    newProject.save(function (err) {
      if (err) console.error(err)
    })
    req.flash('success', {msg: 'Success! You have created a project.'})
    res.redirect('/projects/new')
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
      foundProject.content = markdown(foundProject.content)
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
        thisProject.contact = []
        thisProject.data = []
        thisProject.keywords = []
        thisProject.name = req.body.title || ''
        thisProject.id = slug(thisProject.name)
        thisProject.status = req.body.status || ''
        thisProject.politicalEntity = req.body.politicalEntity || ''
        thisProject.geography = req.body.geography || ''
        thisProject.homepage = req.body.homepage || ''
        thisProject.repository = req.body.repository || ''
        thisProject.description = req.body.description || ''
        thisProject.content = req.body.content || ''
        thisProject.thumbnailUrl = req.body.thumbnailUrl || ''
        thisProject.bannerUrl = req.body.bannerUrl || ''
        if (req.body.categories) {
          req.body.categories.replace(/\s/g, '').split(',').forEach(function (category) {
            thisProject.categories.push(category)
          })
        }
        if (req.body.contacts) {
          req.body.contacts.replace(/\s/g, '').split(',').forEach(function (contact) {
            thisProject.contact.push(contact)
          })
        }
        if (req.body.needs) {
          req.body.needs.replace(/\s/g, '').split(',').forEach(function (need) {
            thisProject.needs.push(need)
          })
        }
        if (req.body.keywords) {
          req.body.keywords.replace(/\s/g, '').split(',').forEach(function (keyword) {
            thisProject.keywords.push(keyword)
          })
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
   * POST /projects/:projectID/settings
   * Submit IDSettings Projects.
   */
  postProjectsIDSync: function (req, res) {
    res.redirect('projects/:projectID/settings')
  }
}
