var Events = require('../models/Events')
var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  /**
   * GET /events
   * List of Event examples.
   */
  getEvents: function (req, res) {
    Events.find({}, function (err, foundEvents) {
      if (err) console.error(err)
      var mappedEvents = foundEvents.filter(function (event) {
        return event.start > moment().unix()
      }).map(function (event) {
        event.convertedstart = moment.unix(event.start).tz(res.locals.brigade.location.timezone).format('ha z MMMM DD, YYYY')
        return event
      })
      res.render(res.locals.brigade.theme.slug + '/views/events/index', {
        view: 'event-list',
        events: mappedEvents,
        upcomingevents: mappedEvents.slice(0, 10),
        title: 'Events',
        brigade: res.locals.brigade
      })
    }).sort({start: 1})
  },
  /**
   * GET /events/manage
   * Manage Events.
   */
  getEventsManage: function (req, res) {
    Events.find({}, function (err, foundEvents) {
      if (err) console.error(err)
      var mappedEvents = foundEvents.map(function (event) {
        event.localstart = moment.unix(event.start).tz(res.locals.brigade.location.timezone).format('ha z MMMM DD, YYYY')
        return event
      })
      res.render(res.locals.brigade.theme.slug + '/views/events/manage', {
        view: 'event-list-manage',
        title: 'Manage Events',
        allEvents: mappedEvents,
        brigade: res.locals.brigade
      })
    }).sort({start: 1})
  },
  /**
   * POST /events/manage
   * Update all Events.
   */
  postEventsManage: function (req, res) {
    var mongooseQuery = {}
    //  if (!res.locals.user.isAdmin()) {
    //   //  mongooseQuery.author = res.locals.user.username
    //  }
    Events.find(mongooseQuery, function (err, events) {
      if (err) console.error(err)
      events.forEach(function (event) {
        var eventInfo = req.body[event.id]
        if (eventInfo.delete) {
          event.remove()
          return
        }
        event.title = eventInfo.title
        event.host = eventInfo.host
        event.localstart = eventInfo.localstart
        event.location = eventInfo.location
        event.save(function (err) {
          if (err) throw err
        })
      })
    })
    req.flash('success', {msg: 'Success! You updated events.'})
    return res.redirect('/events/manage/')
  },
  /**
   * GET /events/new
   * New Events.
   */
  getEventsNew: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/new', {
      view: 'event-new',
      title: 'New Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/new
   * Submit New Events.
   */
  postEventsNew: function (req, res) {
    var newEvent = new Events(req.body)
    newEvent.id = uuid.v1()
    var startString = req.body.startday + req.body.startmonth + req.body.startyear + req.body.starthour + req.body.startminute
    var endString = req.body.endday + req.body.endmonth + req.body.endyear + req.body.endhour + req.body.endminute
    newEvent.start = moment.tz(startString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
    newEvent.end = moment.tz(endString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
    if (newEvent.end < newEvent.start) {
      req.flash('errors', {msg: 'You can not create an event with an end time earlier than its start time.'})
      res.redirect('/events/new')
      return
    }
    newEvent.save(function (err) {
      if (err) console.error(err)
    })
    req.flash('success', {msg: 'Success! You have created an event.'})
    res.redirect('/events/new')
  },

  /**
   * GET /events/:eventID
   * Display Event by ID.
   */
  getEventsID: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/event', {
      view: 'event',
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
    Events.find({id: req.params.eventId}, function (err, foundEvent) {
      if (err) console.log(err)
      var startDigits = moment.unix(foundEvent[0].start).tz(res.locals.brigade.location.timezone).format('MMM, D, YYYY, HH, mm').split(',')
      var endDigits = moment.unix(foundEvent[0].end).tz(res.locals.brigade.location.timezone).format('MMM, D, YYYY, HH, mm').split(',')
      res.render(res.locals.brigade.theme.slug + '/views/events/settings', {
        view: 'event-settings',
        event: foundEvent[0],
        title: 'Event Settings',
        start: startDigits,
        end: endDigits,
        brigade: res.locals.brigade
      })
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSettings: function (req, res) {
    Events.find({id: req.params.eventId}, function (err, foundEvent) {
      if (err) console.log(err)
      var thisEvent = foundEvent[0]
      var startString = req.body.startday + req.body.startmonth + req.body.startyear + req.body.starthour + req.body.startminute
      var endString = req.body.endday + req.body.endmonth + req.body.endyear + req.body.endhour + req.body.endminute
      console.log(startString)
      thisEvent.title = req.body.title
      thisEvent.location = req.body.location
      thisEvent.host = req.body.host
      thisEvent.start = moment.tz(startString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
      thisEvent.end = moment.tz(endString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
      if (thisEvent.end < thisEvent.start) {
        req.flash('errors', {msg: 'You can not have an event with an end time earlier than its start time.'})
        res.redirect('/events/' + req.params.eventId + '/settings')
        return
      }
      thisEvent.url = req.body.url
      thisEvent.description = req.body.description
      thisEvent.save(function (err) {
        if (err) console.log(err)
      })
      req.flash('success', {msg: 'Success! You have updated your event.'})
      res.redirect('/events/' + req.params.eventId + '/settings')
    })
  },
  /**
   * POST /events/sync
   * Sync Events.
   */
  postEventsSync: function (req, res) {
    var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=' + res.locals.brigade.meetup + '&page=50'
    Events.fetchMeetupEvents(url).then(function (value) {
      req.flash('success', {msg: 'Success! You have successfully synced events from Meetup.'})
      res.redirect('/events/manage')
    }).catch(function (error) {
      req.flash('errors', {msg: error})
      res.redirect('/events/manage')
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSync: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  },
  /**
   * POST /events/:eventId/delete
   * Delete Events.
   */
  postDeleteEvent: function (req, res) {
    Events.remove({id: req.params.eventId}, function (err) {
      if (err) {
        console.log(err)
      }
      req.flash('success', {msg: 'Your event was deleted.'})
      res.redirect('/events/manage')
    })
  },
  /**
   * POST /events/:eventId/delete
   * Delete Events.
   */
  postDeleteAllEvents: function (req, res) {
    Events.remove({}, function (err) {
      if (err) {
        console.log(err)
      }
      req.flash('success', {msg: 'Your events were deleted.'})
      res.redirect('/events/manage')
    })
  }
}
