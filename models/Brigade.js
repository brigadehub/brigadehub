var mongoose = require('mongoose')

var brigadeSchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
  recoveryEmail: String,
  location: {
    general: String,
    specific: String,
    geo: String
  },
  url: String,
  github: String,
  meetup: String,
  theme: {
    slug: String,
    logo: String,
    show: {
      title: Boolean,
      events: Boolean,
      projects: Boolean,
      blog: Boolean,
      about: Boolean,
      login: Boolean
    }
  },
  copy: {
    tagline: String,
    description: String
  },
  auth: {
    github: {
      clientId: String,
      clientSecret: String
    },
    slack: {
      clientId: String,
      clientSecret: String
    },
    meetup: {
      consumerKey: String,
      consumerSecret: String
    },
    google: {
      clientId: String,
      clientSecret: String
    }
  },
  auditLog: Array
})

module.exports = mongoose.model('Brigade', brigadeSchema)
