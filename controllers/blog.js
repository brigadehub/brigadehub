'use strict'

var Post = require('../models/Posts')
var User = require('../models/Users')
var markdown = require('marked')
var _ = require('lodash')

module.exports = {
  /**
   * GET /blog
   * List of Blog examples.
   */
  getBlog: function (req, res) {
    var mongooseQuery = {}
    if (req.query.tag) {
      mongooseQuery.tags = req.query.tag
    }
    Post.find({}, function (err, results) {
      if (err) console.error(err)
      var tags = _.uniq(_.flatMap(results, 'tags'))
      var blogPosts = []
      Post.find(mongooseQuery, function (err, results) {
        if (err) console.error(err)
        results.forEach(function (post) {
          if (post.published) {
            blogPosts.push(post)
          }
        })
        res.render(res.locals.brigade.theme.slug + '/views/blog/index', {
          title: 'Blog',
          view: 'blog-list',
          brigade: res.locals.brigade,
          user: res.locals.user,
          posts: blogPosts,
          tags: tags,
          query: req.query.tag
        })
      })
    })
  },
  /**
   * GET /blog/manage
   * Manage Blog.
   */
  getBlogManage: function (req, res) {
    Post.find({}, function (err, posts) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/blog/manage', {
        view: 'blog-list-manage',
        title: 'Manage Blog',
        brigade: res.locals.brigade,
        posts: posts
      })
    })
  },
  /**
   * POST /blog/manage
   * Update all Blog.
   */
  postBlogManage: function (req, res) {
    req.flash('success', { msg: 'Success! Posts edited' })
    Post.find({}, function (err, posts) {
      if (err) console.error(err)
      posts.forEach(function (post) {
        var reqPostInfo = req.body[post.id]
        post.published = !!reqPostInfo.published
        post.author = reqPostInfo.author
        post.date = reqPostInfo.date
        post.save(function (err) {
          if (err) throw err
        })
      })
    })
    return res.redirect('/blog/manage/')
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
      view: 'blog-post-new',
      title: 'New Blog',
      brigade: res.locals.brigade,
      user: res.locals.user,
      plaintextcontent: req.session.blogpostplaintextcontent,
      uniqueId: uniqueId
    })
  },
  /**
   * POST /blog/new
   * Submit New Blog.
   */
  postBlogNew: function (req, res) {
    let content = req.body.content
    let blogpost = new Post({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      image: req.body.image,
      description: req.body.description,
      content: req.body.content,
      date: req.body.date,
      unix: req.body.unix,
      tags: req.body.tags,
      published: true
    })
    if (req.body.tags.indexOf(',') > -1) {
      req.body.tags = req.body.tags.split(',')
      blogpost.tags = req.body.tags.map(function (tag) {
        return tag.trim()
      })
    }
    var defaultUrl = req.body.title.toLowerCase().replace(/\s+/g, '-')
    blogpost.slug = defaultUrl
    blogpost.save(function (err) {
      if (err) {
        req.session.blogpostplaintextcontent = content
        req.flash('errors', { msg: err.message })
        return res.redirect(req.session.returnTo || '/blog/new')
      } else {
        req.session.blogpostplaintextcontent = null
        req.flash('success', { msg: 'Success! Blog post created' })
        return res.redirect('/blog/post/' + blogpost.slug)
      }
    })
  },

  /**
   * GET /blog/:blogID
   * Display Blog by ID.
   */
  getBlogID: function (req, res) {
    console.log(req.params)
    console.log(res.locals)
    Post.find({slug: req.params.blogId}, function (err, post) {
      if (err) throw err
      post = post[0]
      if (post === undefined) {
        res.sendStatus(404)
        return
      }
      post.content = markdown(post.content)
      res.render(res.locals.brigade.theme.slug + '/views/blog/post', {
        view: 'blog-post',
        blogId: req.params.blogId,
        title: 'Blog',
        brigade: res.locals.brigade,
        user: res.locals.user,
        post: post
      })
    })
  },
  /**
   * GET /blog/:blogID/edit
   * IDEdit Blog.
   */
  getBlogIDEdit: function (req, res) {
    Post.find({slug: req.params.blogId}, function (err, post) {
      if (err) throw err
      post = post[0]
      res.render(res.locals.brigade.theme.slug + '/views/blog/edit', {
        view: 'blog-post-edit',
        blogId: req.params.blogId,
        title: 'Edit Blog',
        brigade: res.locals.brigade,
        user: res.locals.user,
        post: post
      })
    })
  },
  /**
   * POST /blog/:blogID/edit
   * Submit IDEdit Blog.
   */
  postBlogIDEdit: function (req, res) {
    // - slug: String, // this is the slug
    // - title: String, // Display title
    // - author: String,
    // - url: String, // an external link you can use to override where to go when clicking
    // - image: String,
    // - description: String,
    // - content: String,
    // - date: String,
    // - unix: Number,
    // - tags: Array

    Post.find({slug: req.params.blogId}, function (err, post) {
      if (err) throw err
      console.log(post)
      post = post[0]
      post.title = req.body.title
      post.author = req.body.author
      post.url = req.body.url
      post.image = req.body.image
      post.description = req.body.description
      post.content = req.body.content
      post.date = req.body.date
      post.unix = req.body.unix
      post.tags = req.body.tags
      if (req.body.tags.indexOf(',') > -1) {
        req.body.tags = req.body.tags.split(',')
        post.tags = req.body.tags.map(function (tag) {
          return tag.trim()
        })
      }
      console.log(post.tags)
      post.save(function (err) {
        if (err) {
          req.session.blogpostplaintextcontent = post.content
          req.flash('errors', { msg: err.message })
          return res.redirect(req.session.returnTo || '/blog/post/' + req.params.blogId + '/edit')
        } else {
          req.session.blogpostplaintextcontent = null
          req.flash('success', { msg: 'Success! Blog post updated' })
          return res.redirect('/blog/post/' + post.slug)
        }
      })
    })
  },
  postBlogIDDelete: function (req, res) {
    Post.remove({slug: req.params.blogId}, function (err) {
      if (err) {
        console.log(err)
        return res.redirect('/blog/post/' + req.params.blogId)
      } else {
        req.flash('success', {msg: 'Your post was deleted.'})
        return res.redirect('/blog/')
      }
    })
  },
  /**
   * GET /blog/:blogID
   * Display Blog by ID.
   */
  getAuthorId: function (req, res) {
    // console.log(req.params)
    // console.log(res.locals)
    User.find({username: req.params.authorId}, function (err, user) {
      if (err) throw err
      var author = user[0]
      if (author === undefined) {
        res.sendStatus(404)
        return
      }
      Post.find({author: req.params.authorId}, function (err, posts) {
        if (err) throw err
        res.render(res.locals.brigade.theme.slug + '/views/blog/author', {
          author: author,
          title: 'Blog',
          brigade: res.locals.brigade,
          user: res.locals.user,
          posts: posts
        })
      })
    })
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
