/**
 * Split into declaration and initialization for better startup performance.
 */

var request

var _ = require('lodash')
var async = require('async')
var querystring = require('querystring')

module.exports = {
  /**
   * GET /blog
   * List of Blog examples.
   */
  getBlog: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/blog/index', {
      title: 'Blog',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /blog/manage
   * Manage Blog.
   */
  getBlogManage: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/blog/manage', {
      title: 'Manage Blog',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /blog/manage
   * Update all Blog.
   */
  postBlogManage: function (req, res) {
    res.redirect('blog/manage')
  },
  /**
   * GET /blog/new
   * New Blog.
   */
  getBlogNew: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/blog/new', {
      title: 'New Blog',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /blog/new
   * Submit New Blog.
   */
  postBlogNew: function (req, res) {
    res.redirect('blog/new')
  },

  /**
   * GET /blog/:blogID
   * Display Blog by ID.
   */
  getBlogID: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/blog/post', {
      blogId: req.params.blogID,
      title: 'Blog',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /blog/:blogID/edit
   * IDEdit Blog.
   */
  getBlogIDEdit: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/blog/edit', {
      blogId: req.params.blogID,
      title: 'IDEdit Blog',
      brigade: req.locals.brigade
    })
  },
  /**
   * POST /blog/:blogID/edit
   * Submit IDEdit Blog.
   */
  postBlogIDEdit: function (req, res) {
    res.redirect('Blog/' + req.params.blogID + '/edit')
  },
  /**
   * POST /blog/sync
   * Sync Blog.
   */
  postBlogSync: function (req, res) {
    res.redirect('blog/manage')
  },
  /**
   * POST /blog/:blogID/edit
   * Submit IDEdit Blog.
   */
  postBlogIDSync: function (req, res) {
    res.redirect('blog/' + req.params.blogID + '/edit')
  }
}
