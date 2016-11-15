'use strict'

var Post = require('../models/Posts')
var User = require('../models/Users')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)
var _ = require('lodash')

module.exports = {
  /**
   * GET /blog
   * List of Blog examples.
   */
  getBlog: function (req, res) {
    var POSTS_PER_PAGE = 9
    var page = 1

    var mongooseQuery = {}
    if (req.query.tag) {
      mongooseQuery.tags = req.query.tag
    }
    if (req.query.page) {
      page = req.query.page
    }
    var user = res.locals.user
    Post.find({ published: true }, function (err, posts) {
      if (err) console.error(err)
      var tags = _.uniq(_.flatMap(posts, 'tags'))
      Post.find(mongooseQuery, function (err, posts) {
        if (err) console.error(err)
        if (user && user.isBlogger()) {
          if (!user.isAdmin()) {
            posts = _.filter(posts, function (post) { return post.published || (user && post.author === user.username) })
          }
        } else {
          // most users only see published posts
          posts = _.filter(posts, function (post) { return post.published })
        }
        posts = posts.reverse()
        var postStart = (page - 1) * POSTS_PER_PAGE
        var totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
        var pagePosts = posts.splice(postStart, POSTS_PER_PAGE)

        var currentUrl = '/blog'
        if (req.query.tag) {
          currentUrl += '?tag=' + req.query.tag + '&' + 'page='
        } else {
          currentUrl += '?' + 'page='
        }

        res.render(res.locals.brigade.theme.slug + '/views/blog/index', {
          title: 'Blog',
          view: 'blog-list',
          brigade: res.locals.brigade,
          user: user,
          posts: pagePosts,
          tags: tags,
          selectedTag: req.query.tag,
          page: page,
          totalPages: totalPages,
          currentUrl: currentUrl
        })
      })
    })
  },
  /**
   * GET /blog/manage
   * Manage Blog.
   */
  getBlogManage: function (req, res) {
    var mongooseQuery = {}
    if (!res.locals.user.isAdmin()) {
      mongooseQuery.author = res.locals.user.username
    }
    Post.find(mongooseQuery, function (err, posts) {
      if (err) console.error(err)
      posts.reverse() // so that most recent are first
      User.find({}, function (err, users) {
        if (err) console.log(err)
        var usernames = users.map(function (user) { return user.username })
        res.render(res.locals.brigade.theme.slug + '/views/blog/manage', {
          view: 'blog-list-manage',
          title: 'Manage Blog',
          brigade: res.locals.brigade,
          posts: posts,
          usernames: usernames
        })
      })
    })
  },
  /**
   * POST /blog/manage
   * Update all Blog.
   */
  postBlogManage: function (req, res) {
    req.flash('success', { msg: 'Success! Posts edited' })
    var mongooseQuery = {}
    if (!res.locals.user.isAdmin()) {
      mongooseQuery.author = res.locals.user.username
    }
    Post.find(mongooseQuery, function (err, posts) {
      if (err) console.error(err)
      posts.reverse() // so that most recent are first
      posts.forEach(function (post) {
        var postInfo = req.body[post.id]
        if (postInfo.delete) {
          post.remove()
          return
        }
        post.title = postInfo.title
        post.published = !!postInfo.published
        post.author = postInfo.author
        post.date = postInfo.date
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
    User.find({}, function (err, users) {
      if (err) console.error(err)
      let usernames = users.map(function (user) { return user.username })
      res.render(res.locals.brigade.theme.slug + '/views/blog/new', {
        view: 'blog-post-new',
        title: 'New Blog',
        brigade: res.locals.brigade,
        user: res.locals.user,
        usernames: usernames,
        plaintextcontent: req.session.blogpostplaintextcontent,
        uniqueId: uniqueId
      })
    })
  },
  /**
   * POST /blog/new
   * Submit New Blog.
   */
  postBlogNew: function (req, res) {
    let blogpost = new Post({
      title: req.body.title,
      author: req.body.author,
      url: '/blog/post/' + req.body.url,
      image: req.body.image,
      description: req.body.description,
      content: req.body.content,
      date: req.body.date,
      unix: req.body.unix,
      tags: req.body.tags,
      published: req.body.published
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
        req.session.blogpostplaintextcontent = req.body.content
        req.flash('errors', { msg: err.message })
        return res.redirect(req.session.returnTo || '/blog/new')
      } else {
        req.session.blogpostplaintextcontent = null
        if (req.body.published === 'true') {
          req.flash('success', { msg: 'Success! Blog post created.' })
        } else {
          req.flash('success', { msg: 'Success! Blog post saved.' })
        }
        return res.redirect('/blog/post/' + blogpost.slug)
      }
    })
  },

  /**
   * GET /blog/:blogID
   * Display Blog by ID.
   */
  getBlogID: function (req, res) {
    Post.find({slug: req.params.blogId}, function (err, post) {
      if (err) throw err
      post = post[0]
      if (post === undefined) {
        res.sendStatus(404)
        return
      }
      post.content = md.render(post.content)
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
      User.find({}, function (err, users) {
        if (err) console.log(err)
        var usernames = users.map(function (user) { return user.username })
        res.render(res.locals.brigade.theme.slug + '/views/blog/edit', {
          view: 'blog-post-edit',
          blogId: req.params.blogId,
          title: 'Edit Blog',
          brigade: res.locals.brigade,
          user: res.locals.user,
          post: post,
          usernames: usernames
        })
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
   * POST /blog/sync/:type
   * Sync Blog.
   */
  postBlogSync: function (req, res) {
    var type = req.params.type

    if (type === 'jekyll') {
      var blogLocation = res.locals.brigade.blog.jekyll
      // recursively list md files in _posts folder
      Post.syncJekyll(blogLocation, res.locals.user.tokens[0].accessToken).then(function (results) {
        req.flash('success', {msg: 'Successfully synced posts from Jekyll!'})
        res.redirect('/blog/manage')
      }).catch(function (err) {
        req.flash('errors', {msg: 'Unable to sync: ' + err})
        res.redirect('/brigade')
      })
    }
  },
  /**
   * POST /blog/:blogID/edit
   * Submit IDEdit Blog.
   */
  postBlogIDSync: function (req, res) {
    res.redirect('blog/' + req.params.blogID + '/edit')
  }
}
