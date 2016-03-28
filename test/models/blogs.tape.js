'use strict'

const test = require('tape-catch')
const Blog = require('../../models/Blogs')
const uuid = require('uuid')

var db = require('../db-connect')()

test('Blogs #save()', function (t) {
  t.plan(4)

  var uniquePostName = uuid.v4()

  let blogpost = new Blog({
    title: uniquePostName,
    plaintextcontent: '# Had a floopsy',
    htmlcontent: '<p> La floop floop </p>',
    date: '1459186599827'
  })

  let duplicateblogpost = new Blog({
    title: uniquePostName,
    plaintextcontent: '# Had a flip flop',
    htmlcontent: '<p> La flip flop </p>'
  })

  t.test('should save', function (t) {
    console.log('saving')
    blogpost.save(function (err) {
      console.log('end of save')
      if (err) {
        t.end(err)
      } else {
        t.end()
      }
    })
  })

  t.test('should throw validation error on duplicate title', function (t) {
    console.log('saving')

    duplicateblogpost.save(function (err) {
      console.log('end of save')

      if (err) {
        console.log('error')
        t.pass()
        t.end()
      } else {
        console.log('no error')
        t.fail()
        t.end()
      }
    })
  })

  t.test('should generate a caption from htmlcontent', function (t) {
    blogpost.save(function (err, blogpost) {
      if (err) {
        t.end(err)
      } else {
        t.equal(blogpost.caption, ' La floop floop ')
        t.end()
      }
    })
  })

  t.test('should generate a normalizedDate field', function (t) {
    blogpost.save(function (err) {
      if (err) {
        t.end(err)
      } else {
        t.equal(blogpost.normalizedDate, 'Tuesday, March 29th 2016, 1AM')
        t.end()
      }
    })
  })
})
test.onFinish(function () {
  console.log('finished tests')
  db.disconnect()
})
