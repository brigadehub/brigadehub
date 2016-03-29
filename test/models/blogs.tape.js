'use strict'

const test = require('tape-catch')
const Blog = require('../../models/Blogs')
const uuid = require('uuid')
const moment = require('moment')

var db = require('../db-connect')()

test('Blogs #save()', function (t) {
  t.plan(4)

  var uniquePostName = uuid.v4()

  let date = Date.now()
  let blogpost = new Blog({
    title: uniquePostName,
    plaintextcontent: '# Had a floopsy',
    htmlcontent: '<p> La floop floop </p>',
    date: date
  })

  let duplicateblogpost = new Blog({
    title: uniquePostName,
    plaintextcontent: '# Had a flip flop',
    htmlcontent: '<p> La flip flop </p>'
  })

  t.test('should save', function (t) {
    blogpost.save(function (err) {
      if (err) {
        t.end(err)
      } else {
        t.end()
      }
    })
  })

  t.test('should throw validation error on duplicate title', function (t) {
    duplicateblogpost.save(function (err) {
      if (err) {
        t.pass()
        t.end()
      } else {
        t.fail()
        t.end()
      }
    })
  })

  t.test('should generate a caption from htmlcontent', function (t) {
    blogpost.save(function (err) {
      if (err) {
        t.end(err)
      } else {
        t.equal(blogpost.caption, ' La floop floop ')
        t.end()
      }
    })
  })

  t.test('should generate a normalizedDate field', function (t) {
    console.log(blogpost)
    console.log(blogpost.date)
    console.log(blogpost.normalizedDate)
    blogpost.save(function (err) {
      if (err) {
        t.end(err)
      } else {
        t.equal(blogpost.normalizedDate, moment(date).format('dddd, MMMM Do YYYY, hA'))
        t.end()
      }
    })
  })
})
test.onFinish(function () {
  console.log('finished tests')
  db.disconnect()
})
