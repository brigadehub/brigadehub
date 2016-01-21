var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /blog
 * Blog form page.
 */
exports.getBlog = function(req, res) {
  res.render('blog', {
    title: 'Blog'
  });
};

/**
 * POST /blog
 * Send a blog form via Nodemailer.
 */
exports.postBlog = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/blog');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Blog Form | Hackathon Starter';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/blog');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/blog');
  });
};
