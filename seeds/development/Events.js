
// var faker = require('faker')

module.exports = [
  {
    id: '1', // this is the slug
    title: 'Event 1', // Display title
    start: '1460238248', // Moment-ish date, ISO8601 string, http://en.wikipedia.org/wiki/ISO_8601
    end: '1480238248', // same ^^
    allDay: false, // shows time of day or not
    url: 'http://www.google.com', // an external link you can use to override where to go when clicking
    // These options are used within brigadehub for content storage
    description: 'test event 1',
    location: 'test location 1',
    host: 'test host 1'
  },
  {
    id: '2', // this is the slug
    title: 'Event 2', // Display title
    start: '1460538248', // Moment-ish date, ISO8602 string, http://en.wikipedia.org/wiki/ISO_8602
    end: '1460838248', // same ^^
    allDay: false, // shows time of day or not
    url: 'http://www.google.com', // an external link you can use to override where to go when clicking
    // These options are used within brigadehub for content storage
    description: 'test event 2',
    location: 'test location 2',
    host: 'test host 2'
  },
  {
    id: '3', // this is the slug
    title: 'Event 3', // Display title
    start: '1461238248', // Moment-ish date, ISO8603 string, http://en.wikipedia.org/wiki/ISO_8603
    end: '1461239248', // same ^^
    allDay: false, // shows time of day or not
    url: 'http://www.google.com', // an external link you can use to override where to go when clicking
    // These options are used within brigadehub for content storage
    description: 'test event 3',
    location: 'test location 3',
    host: 'test host 3'
  }
]
