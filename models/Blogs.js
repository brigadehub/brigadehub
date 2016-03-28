'use strict'

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const moment = require('moment')

let blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  htmlcontent: String,
  plaintextcontent: String,
  caption: String,
  date: { type: Date, default: Date.now },
  normalizedDate: String,
  published: Boolean
})

blogSchema.plugin(uniqueValidator)

/*
 * Generates a caption by grabbing the first <p></p> tag and
 * trimming it down to 200 characters
 *
 */
blogSchema.pre('save', function (next) {
  let regex = /<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/
  let match = regex.exec(this.htmlcontent)
  this.caption = match[1].slice(0, 200)
  next()
})

/*
 * Provides a normalized date for easy retrieval
 *
 */
blogSchema.pre('save', function (next) {
  this.normalizedDate = moment(this.date).format('dddd, MMMM Do YYYY, hA')
  next()
})

module.exports = mongoose.model('Blog', blogSchema)
