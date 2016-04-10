var Users = require('../models/Users')
var nodemailer = require('nodemailer')

module.exports = {
  /**
   * GET /contact
   * Contact form page.
   */
  getContact: function (req, res) {
    Users.find({$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}, function (err, foundUsers) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/contact/index', {
        view: 'contact',
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
    Users.find({$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}, function (err, foundUsers) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/contact/edit', {
        view: 'contact',
        users: foundUsers,
        title: 'Edit Contact',
        brigade: res.locals.brigade
      })
    })
  },
  /**
   * POST /contact/edit
   * Update Contact page info
   */
  postContact: function (req, res) {
    Users.find({$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}, function (err, foundUsers) {
      console.log(req.body)
      foundUsers.forEach(function (user) {
        var thisUser = new Users(user)
        if (req.body[thisUser.username]) {
          thisUser.profile.showcontact = true
        } else {
          thisUser.profile.showcontact = false
        }
        thisUser.save(function (err) {
          if (err) console.error(err)
        })
      })
    })
    res.redirect('/contact/edit')
  },

  postContactMessage: function (req, res) {
    req.assert('name', 'Name cannot be blank').notEmpty()
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('message', 'Message cannot be blank').notEmpty()
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: res.locals.brigade.auth.email.user,
        pass: res.locals.brigade.auth.email.password
      }
    })
    var mailOptions = {
      from: req.body.email,
      to: res.locals.brigade.auth.email.user,
      subject: 'Message from ' + req.body.email,
      text: req.body.message
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: ' + info.response)
    })
    res.redirect('/contact')
  }
}
