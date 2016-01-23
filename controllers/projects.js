/**
 * Split into declaration and initialization for better startup performance.
 */

var request

var _ = require('lodash')
var async = require('async')
var querystring = require('querystring')

module.exports = {
  /**
   * GET /Projects
   * List of Project examples.
   */
  getProjects: function (req, res) {
    res.render('projects/index', {
      title: 'Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /Projects/manage
   * Manage Projects.
   */
  getProjectsManage: function (req, res) {
    res.render('projects/manage', {
      title: 'Manage Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /Projects/manage
   * Update all Projects.
   */
  postProjectsManage: function (req, res) {
    res.redirect('projects/manage')
  },
  /**
   * GET /Projects/new
   * New Projects.
   */
  getProjectsNew: function (req, res) {
    res.render('projects/new', {
      title: 'New Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /Projects/new
   * Submit New Projects.
   */
  postProjectsNew: function (req, res) {
    res.redirect('projects/new')
  },

  /**
   * GET /Projects/:projectID
   * Display Project by ID.
   */
  getProjectsID: function (req, res) {
    res.render('projects/project', {
      projectId: req.params.projectId,
      title: 'Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /Projects/:projectID/settings
   * IDSettings Projects.
   */
  getProjectsIDSettings: function (req, res) {
    res.render('projects/settings', {
      projectId: req.params.projectId,
      title: 'IDSettings Projects',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /Projects/:projectID/settings
   * Submit IDSettings Projects.
   */
  postProjectsIDSettings: function (req, res) {
    res.redirect('projects/:projectID/settings')
  },
  /**
   * POST /Projects/sync
   * Sync Projects.
   */
  postProjectsSync: function (req, res) {
    res.redirect('projects/manage')
  },
  /**
   * POST /Projects/:projectID/settings
   * Submit IDSettings Projects.
   */
  postProjectsIDSync: function (req, res) {
    res.redirect('projects/:projectID/settings')
  }
}
