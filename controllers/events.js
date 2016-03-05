/**
 * Split into declaration and initialization for better startup performance.
 */
var Events = require('../models/Events')

module.exports = {
  /**
   * GET /events
   * List of Event examples.
   */
  getEvents: function (req, res) {
  var meetupid = "www.meetup.com/Code-for-San-Francisco-Civic-Hack-Night/".split(".com/")[1].replace(/\//g, "")
  var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=' + meetupid + '&page=50'

  var aggregate = []
  Events.fetchMeetupEvents(url).then(function(result){
    result.forEach(function(item){
      var event = {
        title: item.name,
        start: new Date(item.time+item.utc_offset),
        venue: item.venue.name,
        address: item.venue.address_1,
        city: item.venue.city,
        url_page: item.event_url
      }
      aggregate.push(event)
    })

    res.render(res.locals.brigade.theme.slug + '/views/events/index', {
      events: aggregate,
      upcomingevents: aggregate.slice(0,10),
      title: 'Events',
      brigade: res.locals.brigade
    })
  }, function(error){
    console.log(error)
    res.render(res.locals.brigade.theme.slug + '/views/events/index', {
      title: 'Events',
      error: error,
      brigade: res.locals.brigade
    })
  })

  },
  /**
   * GET /events/manage
   * Manage Events.
   */
  getEventsManage: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/manage', {
      title: 'Manage Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/manage
   * Update all Events.
   */
  postEventsManage: function (req, res) {
    res.redirect('Events/manage')
  },
  /**
   * GET /events/new
   * New Events.
   */
  getEventsNew: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/new', {
      title: 'New Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/new
   * Submit New Events.
   */
  postEventsNew: function (req, res) {
    res.redirect('events/new')
  },

  /**
   * GET /events/:eventID
   * Display Event by ID.
   */
  getEventsID: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/event', {
      eventID: req.params.eventID,
      title: 'Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * GET /events/:eventID/settings
   * IDSettings Events.
   */
  getEventsIDSettings: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/settings', {
      eventID: req.params.eventID,
      title: 'IDSettings Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSettings: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  },
  /**
   * POST /events/sync
   * Sync Events.
   */
  postEventsSync: function (req, res) {

    res.redirect('/events/manage')
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSync: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  }
}

