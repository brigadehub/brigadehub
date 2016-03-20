'use strict'

var test = require('tape')
var Blog = require('../../models/Blogs')

test('#save()', function (t) {
  t.plan(2)

  let blogpost = new Blog({
    title: 'Jonny Foobar',
    plaintextcontent: '# Had a floopsy',
    htmlcontent: '<p> La floop floop </p>'
  })

  let duplicateblogpost = new Blog({
    title: 'Jonny Foobar',
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
})
