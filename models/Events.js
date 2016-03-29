var mongoose = require('mongoose')
var request = require('request')
var moment = require('moment')
var eventsSchema = new mongoose.Schema({
  // Follows fullcalendar's event object model, display options omitted:
  // http://fullcalendar.io/docs/event_data/Event_Object/
  id: String, // this is the slug
  title: String, // Display title
  start: String, // Moment-ish date, ISO8601 string, http://en.wikipedia.org/wiki/ISO_8601
  end: String, // same ^^
  allDay: Boolean, // shows time of day or not
  url: String, // an external link you can use to override where to go when clicking

  // These options are used within brigadehub for content storage
  description: String,
  location: String,
  hosts: Array
})

eventsSchema.methods.fetchGoogleEvents = function (cb) {
  cb(null, {})
}

eventsSchema.statics.fetchMeetupEvents = function (meetupid) {
  var Events = this
  return new Promise(function (resolve, reject) {
    getEvents(meetupid, function (err, aggregate) {
      if (err) console.error(err)
      if (aggregate.length < 1) {
        reject('We were unable to find any events attached to your Meetup account. Please check your Meetup.com credentials if you were expecting to import some events. ')
      } else {
        aggregate.forEach(function (outing) {
          Events.find({'id': outing.id}, function (err, foundEvent) {
            if (foundEvent.length < 1) {
              if (err) console.error(err)
              var eventData = createEventData(outing)
              var newEvent = new Events(eventData)
              newEvent.save(function (err) {
                if (err) console.error(err)
              })
            }
          })
        })
        resolve()
      }
    })
  })
}

function getEvents (meetupid, callback) {
  request(meetupid, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var parsed = JSON.parse(body)
      return callback(null, parsed.results)
    } else {
      return callback(error, [])
    }
  })
}

function createEventData (event) {
  var eventData = {}
  eventData.id = event.id || ''
  eventData.title = event.name || ''
  eventData.url = event.event_url || ''
  eventData.description = event.description || ''
  eventData.location = event.venue.address_1 + ' ' + event.venue.city || ''
  eventData.hosts = event.venue.name || ''
  eventData.start = moment(new Date(event.time)).format() || ''
  eventData.end = moment(new Date(event.time + event.duration)).format() || ''
  return eventData
}

module.exports = mongoose.model('Events', eventsSchema)
