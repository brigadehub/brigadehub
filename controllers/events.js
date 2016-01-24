/**
 * Split into declaration and initialization for better startup performance.
 */

var request

var _ = require('lodash')
var async = require('async')
var querystring = require('querystring')

module.exports = {
  /**
   * GET /events
   * List of Event examples.
   */
  getEvents: function (req, res) {
    var events =  [
        {
            title  : 'event1',
            start  : '2016-01-01'
        },
        {
            title  : 'event2',
            start  : '2016-01-05',
            end    : '2016-01-07'
        },
        {
            title  : 'event3',
            start  : '2016-01-09T12:30:00',
            allDay : false // will make the time show
        }
    ]
    res.render(req.locals.brigade.theme.slug+'/views/events/index', {
      events: events,
      title: 'Events',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /events/manage
   * Manage Events.
   */
  getEventsManage: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/events/manage', {
      title: 'Manage Events',
      brigade: req.locals.brigade
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
    res.render(req.locals.brigade.theme.slug+'/views/events/new', {
      title: 'New Events',
      brigade: req.locals.brigade
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
    res.render(req.locals.brigade.theme.slug+'/views/events/event', {
      eventID: req.params.eventID,
      title: 'Events',
      brigade: req.locals.brigade
    })
  },
  /**
   * GET /events/:eventID/settings
   * IDSettings Events.
   */
  getEventsIDSettings: function (req, res) {
    res.render(req.locals.brigade.theme.slug+'/views/events/settings', {
      eventID: req.params.eventID,
      title: 'IDSettings Events',
      brigade: req.locals.brigade
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
    res.redirect('Events/manage')
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSync: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  }
}
