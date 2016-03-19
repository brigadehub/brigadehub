'use strict'

var Blog = require('../../models/Blogs')
var expect = require('chai').expect
let fakeblogpost

describe('Blog Model', function () {
  beforeEach(function (done) {
    fakeblogpost = {
      title: 'Jonny Foobar',
      plaintextcontent: '# Had a foobar',
      htmlcontent: '<p> La la la </p>'
    }

    Blog.remove({title: 'Jonny Foobar'}, function (err) {
      if (err) throw err
    })

    done()
  })

  after(function (done) {
    Blog.remove({title: 'Jonny Foobar'}, function (err) {
      if (err) throw err
    })

    done()
  })

  describe('#save()', function () {
    let blogpost

    beforeEach(function (done) {
      blogpost = new Blog(fakeblogpost)
      done()
    })

    it('should save', function (done) {
      blogpost.save(function (err) {
        if (err) {
          done(err)
        } else {
          done()
        }
      })
    })

    it('should not save a document with a duplicate title', function (done) {
      let duplicateblogpost = new Blog({
        title: 'Jonny Foobar',
        plaintextcontent: '# Had a floopsy',
        htmlcontent: '<p> La floop floop </p>'
      })

      blogpost.save()

      duplicateblogpost.save(function (err) {
        if (err) {
          expect(err)
          done()
        } else {
          done()
        }
      })
    })
  })
})

