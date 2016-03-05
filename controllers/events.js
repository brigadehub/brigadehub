/**
 * Split into declaration and initialization for better startup performance.
 */
var Events = require('../models/Events')
var request = require('request')
var _ = require('lodash')

module.exports = {
  /**
   * GET /events
   * List of Event examples.
   */
  getEvents: function (req, res) {
  var meetupid = res.locals.brigade.meetup.split(".com/")[1].replace(/\//g, "")
  var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=' + meetupid + '&page=50'
  getEvents = function(url){
    return new Promise(function(resolve, reject){
      request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
          var parsed = JSON.parse(body);
          resolve(parsed.results)
        }
        else{
          reject();
        }
      })
    })
  }
  var aggregate = []
  getEvents(url).then(function(result){
    result.forEach(function(item){
      var event = {title: item.name, start: new Date(item.time+item.utc_offset)}
      aggregate.push(event)
    })

    res.render(res.locals.brigade.theme.slug + '/views/events/index', {
      events: aggregate,
      title: 'Events',
      brigade: res.locals.brigade
    })
  })
  // console.log(aggregate)
  //   var events = [
  //     {
  //       title: 'event1',
  //       start: '2016-01-01'
  //     },
  //     {
  //       title: 'event2',
  //       start: '2016-01-05',
  //       end: '2016-01-07'
  //     },
  //     {
  //       title: 'event3',
  //       start: '2016-01-09T12:30:00',
  //       allDay: false // will make the time show
  //     }
  //   ]

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

