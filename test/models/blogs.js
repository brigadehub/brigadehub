'use strict'

var Blog = require('../../models/Blogs')
let fakeblogpost
let duplicateblogpost

describe('Blog Model', function () {
  beforeEach(function (done) {
    fakeblogpost = {
      title: 'Jonny Foobar',
      plaintextcontent: '# Had a foobar',
      htmlcontent: '<p> La la la </p>'
    }

    duplicateblogpost = {
      title: 'Jonny Foobar',
      plaintextcontent: '# Had a floopsy',
      htmlcontent: '<p> La floop floop </p>'
    }

    Blog.remove()
    done()
  })

  describe('#save()', function () {
    let blogpost

    beforeEach(function (done) {
      blogpost = new Blog(fakeblogpost)
      duplicateblogpost = new Blog(duplicateblogpost)
      done()
    })

    it('should save', function (done) {
      blogpost.save(function (err) {
        if (err) throw err
      })

      done()
    })

    it('should not save a document with a duplicate title', function (done) {
      duplicateblogpost.save(function (err) {
        if (err) throw err
      })

      done()
    })
  })
})

