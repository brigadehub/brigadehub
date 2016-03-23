var Users = require('../models/Users')

module.exports = {
  /**
   * GET /contact
   * Contact form page.
   */
  getContact: function (req, res) {
    Users.find({$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}, function (err, foundUsers) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/contact/index', {
        users: foundUsers,
        title: 'Contact',
        brigade: res.locals.brigade
      })
    })
  },

  /**
   * GET /contact/edit
   * Edit Contact page content.
   */
  getContactEdit: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/contact/edit', {
      title: 'Edit Contact',
      brigade: res.locals.brigade
    })
  },

  /**
   * POST /contact/edit
   * Update Contact page info
   */
  postContact: function (req, res) {
    req.assert('name', 'Name cannot be blank').notEmpty()
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('message', 'Message cannot be blank').notEmpty()
  }
}
