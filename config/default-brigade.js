var moment = require('moment')

module.exports = function () {
  var auditDate = moment().format('YYYY-MM-DD HH:mm:ss')
  return {
    name: 'Code for Example',
    slug: 'codeforexample',
    recoveryEmail: 'admin@codeforexample.org',
    location: {
      general: '',
      specific: '',
      geo: ''
    },
    heroImage: 'https://i.imgur.com/m7omd0N.jpg',
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
      tagline: 'is a community searching for technological solutions to social challenges.',
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
        consumerKey: process.env.MEETUP_KEY,
        consumerSecret: process.env.MEETUP_SECRET
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
