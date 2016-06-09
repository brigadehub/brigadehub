var mongoose = require('mongoose')
var request = require('request')
var ghls = require('gh-ls')
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
  sync:{
    jekyll: {type:String, default:''},
    wordpress: {type:String, default:''},
    medium: {type:String, default:''}
  },
  tags: {type: Array, default: []}
})

postsSchema.statics.syncJekyll = function (blogLocation, accessToken) {
  return new Promise(function (resolve, reject) {
    // recursively get all md file paths in _post
    ghls(blogLocation, function (err, results) {
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
      console.log(files)
      var fileCallPromises = []
      _.forEach(files, function (file) {
        fileCallPromises.push(getFile(blogLocation, file, accessToken))
      })
      Promise.all(fileCallPromises).then(function (results) {
        console.log(results)

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
