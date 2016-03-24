'use strict'

var test = require('tape-catch')
var Blog = require('../../models/Blogs')
var uuid = require('uuid')

var db = require('../db-connect')()

test('Blogs #save()', function (t) {
  t.plan(2)

  var uniquePostName = uuid.v4()

  let blogpost = new Blog({
    title: uniquePostName,
    plaintextcontent: '# Had a floopsy',
    htmlcontent: '<p> La floop floop </p>'
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
})
test.onFinish(function () {
  console.log('finished tests')
  db.disconnect()
})
