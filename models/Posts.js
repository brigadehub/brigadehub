var mongoose = require('mongoose')

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
  tags: {type: Array, default: []}
})

postsSchema.statics.fetchGithubPosts = function (cb) {
  cb(null, {})
}

postsSchema.statics.exportMarkdownPosts = function (cb) {
  cb(null, {})
}

module.exports = mongoose.model('Posts', postsSchema)
