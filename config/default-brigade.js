var moment = require('moment')

module.exports = function () {
  var auditDate = moment().format('YYYY-MM-DD HH:mm:ss')
  return {
    name: 'Code for Example',
    slug: 'code-for-example',
    recoveryEmail: 'admin@codeforexample.org',
    location: {
      general: '',
      specific: '',
      geo: ''
    },
    url: 'http://codeforexample.org',
    github: 'codeforexample',
    theme: {
      slug: 'atl',
      logo: '',
      show: {
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
      description: "We're a bunch of civic-minded technologists, designers, and topic experts using our skills to improve Example and the world."
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
