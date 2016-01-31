/**
 * Split into declaration and initialization for better startup performance.
 */

var request

var _ = require('lodash')
var async = require('async')
var querystring = require('querystring')

var Projects = require('../models/Projects')

module.exports = {
  /**
   * GET /projects
   * List of Project examples.
   */
  getProjects: function (req, res) {
    Projects.find({brigade: req.locals.brigade.slug}, function (err, foundProjects) {
      res.render(req.locals.brigade.theme.slug + '/views/projects/index', {
        title: 'Projects',
        brigade: req.locals.brigade,
        projects: foundProjects
      })
    })

  },
  /**
   * GET /projects/manage
   * Manage Projects.
   */
  getProjectsManage: function (req, res) {
    Projects.find({brigade: req.locals.brigade.slug}, function (err, foundProjects) {
      console.log(foundProjects)
      res.render(req.locals.brigade.theme.slug + '/views/projects/manage', {
        title: 'Manage Projects',
        brigade: req.locals.brigade,
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
    res.render(req.locals.brigade.theme.slug + '/views/projects/new', {
      title: 'New Projects',
      brigade: req.locals.brigade
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
    res.render(req.locals.brigade.theme.slug + '/views/projects/project', {
      projectId: req.params.projectId,
      title: 'Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /projects/:projectID/settings
   * IDSettings Projects.
   */
  getProjectsIDSettings: function (req, res) {
    res.render(req.locals.brigade.theme.slug + '/views/projects/settings', {
      projectId: req.params.projectId,
      title: 'IDSettings Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /projects/:projectID/settings
   * Submit IDSettings Projects.
   */
  postProjectsIDSettings: function (req, res) {
    res.redirect('projects/:projectID/settings')
  },
  /**
   * POST /projects/sync
   * Sync Projects.
   */
  postProjectsSync: function (req, res) {
    Projects.fetchGithubRepos(req.locals.brigade, req.user, function (results) {
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
