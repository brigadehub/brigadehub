module.exports = {
  /**
   * GET /about
   * About form page.
   */
  getAbout: function (req, res) {
    res.render('about/index', {
      title: 'About',
      brigade: req.locals.brigade
    })
  },

  /**
   * GET /about/edit
   * Edit About page content.
   */
  getAboutEdit: function (req, res) {
    res.render('about/edit', {
      title: 'Edit About',
      brigade: req.locals.brigade
    })
  },

  /**
   * POST /about/edit
   * Update About page info
   */
  postAbout: function (req, res) {
    req.assert('name', 'Name cannot be blank').notEmpty()
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('message', 'Message cannot be blank').notEmpty()
  }
}
