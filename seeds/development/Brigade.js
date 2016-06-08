var moment = require('moment')
var faker = require('faker')

module.exports = function () {
  var auditDate = moment().format('YYYY-MM-DD HH:mm:ss')
  return [{
    name: 'Code for Example',
    slug: 'codeforexample',
    recoveryEmail: 'admin@codeforexample.org',
    location: {
      general: '',
      specific: '',
      geo: ''
    },
    heroImage: faker.image.city(1080, 399),
    url: 'http://codeforexample.org',
    github: 'codeforexample',
    redirects: [
      {
        endpoint: '/temp',
        destination: 'https://google.com',
        method: 'GET',
        type: 'temporary'
      },

      {
        endpoint: '/perm/',
        destination: 'https://google.com',
        method: 'GET',
        type: 'permanent'
      }
    ],
    theme: {
      slug: 'codeforpoland',
      logo: 'http://i.imgur.com/v5naij3.png',
      page: {
        title: false,
        events: true,
        projects: true,
        blog: true,
        about: true,
        login: true,
        external: [
          {
            name: 'Google',
            link: 'https://google.com',
            target: '_blank'
          }
        ]
      }
    },
    copy: {
      tagline: 'is a community searching for technological solutions to social challenges.',
      description: "We're a bunch of civic-minded technologists, designers, and topic experts using our skills to improve Example and the world."
    },
    sponsors: [
      {
        name: 'Microsoft',
        url: 'http://microsoft.com',
        image: 'https://i.imgur.com/5VUlJN8.png'
      },
      {
        name: 'Slack',
        url: 'http://slack.com',
        image: 'https://i.imgur.com/Y5L7SgT.png'
      },
      {
        name: 'Zenhub',
        url: 'http://zenhub.io',
        image: 'https://i.imgur.com/jdbLl87.png'
      }
    ],
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
      'initial | ' + auditDate + ' | added default brigade details from seeder'
    ]
  }]
}
