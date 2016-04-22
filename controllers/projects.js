/**
 * Split into declaration and initialization for better startup performance.
 */

var Projects = require('../models/Projects')

module.exports = {
  /**
   * GET /projects
   * List of Project examples.
   */
  getProjects: function (req, res) {
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
      res.render(res.locals.brigade.theme.slug + '/views/projects/index', {
        view: 'project-list',
        title: 'Projects',
        brigade: res.locals.brigade,
        projects: foundProjects,
        keywords: allKeywords.sort()
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
    res.redirect('projects/new')
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
    })
  },
  /**
   * GET /projects/:projectID/settings
   * IDSettings Projects.
   */
  getProjectsIDSettings: function (req, res) {
    Projects.find({'id': req.params.projectId}, function (err, foundProject) {
      if (err) console.log(err)
      res.render(res.locals.brigade.theme.slug + '/views/projects/settings', {
        view: 'project-settings',
        project: foundProject[0],
        title: 'IDSettings Projects',
        brigade: res.locals.brigade
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
      thisProject.categories = []
      thisProject.needs = []
      thisProject.contact = []
      thisProject.name = req.body.title || ''
      thisProject.status = req.body.status || ''
      thisProject.type = req.body.type || ''
      thisProject.homepage = req.body.homepage || ''
      thisProject.repository = req.body.repository || ''
      thisProject.description = req.body.description || ''
      if (req.body.categories) {
        req.body.categories.split(',').forEach(function (category) {
          thisProject.categories.push(category)
        })
      }
      if (req.body.contacts) {
        req.body.contacts.replace(/\s/g, '').split(',').forEach(function (contact) {
          thisProject.contact.push(contact)
        })
      }
      if (req.body.needs) {
        req.body.needs.split(',').forEach(function (need) {
          thisProject.needs.push(need)
        })
      }

      thisProject.save(function (err) {
        if (err) console.log(err)
      })
    })
    console.log(req.body)
    res.redirect('/projects/' + req.params.projectId + '/settings')
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
