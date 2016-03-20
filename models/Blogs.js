'use strict'

var mongoose = require('mongoose')
// var uniqueValidator = require('mongoose-unique-validator')

let blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  htmlcontent: String,
  plaintextcontent: String,
  date: { type: Date, default: Date.now },
  published: Boolean
})

// blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)
