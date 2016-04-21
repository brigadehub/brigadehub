var mongoose = require('mongoose')

var postsSchema = new mongoose.Schema({
  slug: String, // this is the slug
  title: {type: String, required: true}, // Display title
  author: String,
  url: String, // an external link you can use to override where to go when clicking
  image: String,
  description: String,
  content: String,
  date: String,
  published: Boolean,
  unix: Number,
  tags: Array
})

postsSchema.statics.fetchGithubPosts = function (cb) {
  cb(null, {})
}

postsSchema.statics.exportMarkdownPosts = function (cb) {
  cb(null, {})
}

module.exports = mongoose.model('Posts', postsSchema)
