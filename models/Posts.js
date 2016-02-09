var mongoose = require('mongoose')

var postsSchema = new mongoose.Schema({
  id: String, // this is the slug
  title: String, // Display title
  author: String,
  url: String, // an external link you can use to override where to go when clicking
  content: String,
  date: String,
  tags: Array
})

postsSchema.statics.fetchGithubPosts = function (cb) {
  cb(null, isMatch)
}

postsSchema.statics.exportMarkdownPosts = function (cb) {
  cb(null, isMatch)
}

module.exports = mongoose.model('Posts', postsSchema)
