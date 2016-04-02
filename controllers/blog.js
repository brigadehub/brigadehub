'use strict'

var Post = require('../models/Posts')
var markdown = require('marked')
var _ = require('lodash')

module.exports = {
  /**
   * GET /blog
   * List of Blog examples.
   */
  getBlog: function (req, res) {
    var mongooseQuery = {}
    if(req.query.tag){
      mongooseQuery.tags = req.query.tag
    }
    console.log(mongooseQuery)
    Post.find({}, function(err, results){
      var tags = _.uniq(_.flatMap(results, 'tags'))
      Post.find(mongooseQuery, function(err, results){

        var blogPosts = results || []
        console.log(tags)
        res.render(res.locals.brigade.theme.slug + '/views/blog/index', {
          title: 'Blog',
          brigade: res.locals.brigade,
          posts:blogPosts,
          tags:tags,
          query:req.query.tag
        })
      })
    })
  },
  /**
   * GET /blog/manage
   * Manage Blog.
   */
  getBlogManage: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/blog/manage', {
      title: 'Manage Blog',
      brigade: res.locals.brigade
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
    let uniqueId = ''
    for (let i = 0; i < 10; i++) {
      uniqueId += Math.floor(Math.random() * 10)
    }

    res.render(res.locals.brigade.theme.slug + '/views/blog/new', {
      title: 'New Blog',
      brigade: res.locals.brigade,
      plaintextcontent: req.session.blogpostplaintextcontent,
      uniqueId: uniqueId
    })
  },
  /**
   * POST /blog/new
   * Submit New Blog.
   */
  postBlogNew: function (req, res) {
    let content = req.body.blogcontent

    let blogpost = new Post({
      title: req.body.blogtitle,
      plaintextcontent: content,
      // htmlcontent: markdown.toHTML(content)
    })

    blogpost.save(function (err) {
      if (err) {
        req.session.blogpostplaintextcontent = content
        req.flash('errors', { msg: err.message })
        return res.redirect(req.session.returnTo || '/blog/new')
      } else {
        req.session.blogpostplaintextcontent = null
        req.flash('success', { msg: 'Success! Blog post created' })
        return res.redirect('/blog')
      }
    })
  },

  /**
   * GET /blog/:blogID
   * Display Blog by ID.
   */
  getBlogID: function (req, res) {
    console.log(req.params)
    Post.find({slug: req.params.blogId}, function (err, post) {
      if (err) throw err
      console.log(post)
      post = post[0]
      post.content = markdown(post.content)
      res.render(res.locals.brigade.theme.slug + '/views/blog/post', {
        blogId: req.params.blogId,
        title: 'Blog',
        brigade: res.locals.brigade,
        post: post
      })
    })
  },
  /**
   * GET /blog/:blogID/edit
   * IDEdit Blog.
   */
  getBlogIDEdit: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/blog/edit', {
      blogId: req.params.blogID,
      title: 'IDEdit Blog',
      brigade: res.locals.brigade
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
