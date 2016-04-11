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
    }).sort({'profile.contactpagerank': 1})
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
    }).sort({'profile.contactpagerank': 1})
  },
  /**
   * POST /contact/edit
   * Update Contact page info
   */
  postContact: function (req, res) {
    var uniquecheck = {}
    for (var key in req.body) {
      if (req.body[key].contactrank) {
        if (!uniquecheck[req.body[key].contactrank]) {
          uniquecheck[req.body[key].contactrank] = 'present'
        } else {
          req.flash('errors', {msg: 'Changes failed. Please enter unique values for contact page ranks'})
          res.redirect('/contact/edit')
          return
        }
      }
    }
    Users.find({$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}, function (err, foundUsers) {
      if (err) console.error(err)
      foundUsers.forEach(function (user) {
        var thisUser = new Users(user)
        thisUser.profile.contactpagerank = req.body[thisUser.username].contactrank
        if (req.body[thisUser.username].showcontact) {
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
