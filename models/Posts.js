var mongoose = require('mongoose')
var moment = require('moment')
// var request = require('request')
var ghls = require('gh-ls')
var slug = require('slug')
var getGhFile = require('github-get')
var _ = require('lodash')

var postsSchema = new mongoose.Schema({
  slug: {type: String, default: ''}, // this is the slug
  title: {type: String, required: true}, // Display title
  author: {type: String, default: ''},
  url: {type: String, default: ''}, // an external link you can use to override where to go when clicking
  image: {type: String, default: 'http://i.imgur.com/MRgvL1K.png'},
  description: {type: String, default: ''},
  content: {type: String, default: ''},
  date: {type: String, default: ''},
  published: {type: Boolean, default: ''},
  unix: {type: Number, default: 0},
  sync: {
    jekyll: {type: String, default: ''},
    wordpress: {type: String, default: ''},
    medium: {type: String, default: ''}
  },
  tags: {type: Array, default: []}
})

postsSchema.statics.syncJekyll = function (blogLocation, accessToken) {
  var self = this
  return new Promise(function (resolve, reject) {
    // recursively get all md file paths in _post
    ghls(blogLocation, {token: accessToken}, function (err, results) {
      if (err) return reject(err)
      var files = results.tree
      files = _.filter(files, {type: 'blob'})
      files = _.map(files, function (file) {
        return {
          url: file.url,
          path: file.path
        }
      })
      files = _.filter(files, function (file) {
        return file.path.indexOf('.md') > -1
      })
      files = _.filter(files, function (file) {
        return file.path.indexOf('_posts/') > -1
      })
      var fileCallPromises = []
      _.forEach(files, function (file) {
        fileCallPromises.push(getFile(blogLocation, file, accessToken))
      })
      Promise.all(fileCallPromises).then(function (results) {
        var findAndSaveCalls = []
        _.forEach(results, function (post) {
          findAndSaveCalls.push(upsertPost(post, self))
        })
        Promise.all(findAndSaveCalls).then(function (results) {
          resolve()
        }).catch(function (err) {
          reject(err)
        })
      // TODO: save these results
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

postsSchema.statics.exportMarkdownPosts = function (cb) {
  cb(null, {})
}

module.exports = mongoose.model('Posts', postsSchema)

function getFile (location, file, accessToken) {
  return new Promise(function (resolve, reject) {
    getGhFile(
      location.split('/')[0],
      location.split('/')[1],
      file.path,
      {
        token: accessToken
      },
      function (err, data, content) {
        if (err) return reject(err)
        file.content = content
        resolve(file)
      }
    )
  })
}
function upsertPost (originalPost, AllPosts) {
  return new Promise(function (resolve, reject) {
    AllPosts.find({'sync.jekyll': originalPost.url}, function (err, foundPosts) {
      if (err) return reject(err)
      var post
      var thisPostDate
      var filename
      if (foundPosts.length) {
        var foundPost = foundPosts[0]
        post = jekyllParse(originalPost.content)
        foundPost.content = post.body
        foundPost.title = foundPost.title ||
        post.title || (
        post.body.indexOf('\n') > -1 ? post.body.split('\n')[0] : ''
        )
        if (foundPost.title[0] === '"' && foundPost.title[foundPost.title.length - 1] === '"') {
          foundPost.title = foundPost.title.substr(1)
          foundPost.title = foundPost.title.slice(0, -1)
        }
        foundPost.slug = slug(foundPost.title)
        if (typeof post.categories === 'string') {
          if (post.categories.indexOf(',') > -1) {
            post.categories = post.categories.split()
          } else {
            post.categories = [post.categories]
          }
        }
        foundPost.tags = post.categories
        foundPost.author = foundPost.author || post.author
        foundPost.description = foundPost.description || post.lead
        foundPost.sync.jekyll = originalPost.url
        try {
          filename = originalPost.path.split('/')
          filename = filename[filename.length - 1]
          thisPostDate = moment(filename, 'YYYY-MM-DD')
          foundPost.date = thisPostDate.toString()
        } catch (e) {
          console.log('an error occurred during date parsing.', filename, e)
        }
        foundPost.save(function (err, results) {
          if (err) return reject(err)
          resolve(foundPost)
        })
      } else {
        var newPost = new AllPosts()
        post = jekyllParse(originalPost.content)
        newPost.content = post.body
        newPost.title = post.title || (
        post.body.indexOf('\n') > -1 ? post.body.split('\n')[0] : ''
        )
        if (newPost.title[0] === '"' && newPost.title[newPost.title.length - 1] === '"') {
          newPost.title = newPost.title.substr(1)
          newPost.title = newPost.title.slice(0, -1)
        }
        newPost.slug = slug(newPost.title)
        if (typeof post.categories === 'string') {
          if (post.categories.indexOf(',') > -1) {
            post.categories = post.categories.split()
          } else {
            post.categories = [post.categories]
          }
        }
        newPost.tags = post.categories
        newPost.author = post.author
        newPost.description = post.lead
        newPost.sync.jekyll = originalPost.url
        try {
          filename = originalPost.path.split('/')
          filename = filename[filename.length - 1]
          thisPostDate = moment(filename, 'YYYY-MM-DD')
          newPost.date = thisPostDate.toString()
        } catch (e) {
          console.log('an error occurred during date parsing.', filename, e)
        }
        newPost.save(function (err, results) {
          if (err) return reject(err)
          resolve(newPost)
        })
      }
    })
  })
}
function jekyllParse (body) {
  var match = body.match(/^---([\s\S]*)---/)
  var newBody = body.slice(match[0].length).trim()
  var frontMatter = match[1]
  frontMatter = frontMatter.split('\n')
  var fm = {}
  _.forEach(frontMatter, function (data) {
    data = data.split(': ')
    if (data.length > 2) {
      var key = data[0]
      data.shift()
      fm[key] = data.join(': ')
    } else {
      fm[data[0]] = data[1]
    }
  })
  fm.body = newBody
  return fm
}
