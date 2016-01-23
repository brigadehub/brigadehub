var moment = require('moment')

module.exports = function () {
  var auditDate = moment().format('YYYY-MM-DD HH:mm:ss')
  return {
    name: 'Code for Example',
    slug: 'code-for-example',
    admin: '',
    recoveryEmail: 'admin@codeforexample.org',
    location: {
      general: '',
      specific: '',
      geo: ''
    },
    url: 'http://codeforexample.org',
    theme: {
      logo: '',
      show:{
        title: true,
        events: true,
        projects: true,
        blog: true,
        about: true,
        login: true
      }
    },
    copy: {
      tagline: 'An awesome brigade',
      description: 'An awesome brigade that makes awesome stuff'
    },
    auth: {
      github: {
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      },
      slack: {
        clientId: '',
        clientSecret: ''
      },
      meetup: {
        clientId: '',
        clientSecret: ''
      },
      google: {
        clientId: '',
        clientSecret: ''
      }
    },
    auditLog: [
      'initial | ' + auditDate + ' | added default brigade details from `config/default-brigade.js`'
    ]
  }
}
