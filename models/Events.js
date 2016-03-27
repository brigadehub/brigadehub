var mongoose = require('mongoose')
var request = require('request')
var Event = require
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
  getEvents(meetupid, function (err, aggregate) {
    if (err) console.error(err)
    if (aggregate.length < 1) {
      console.error("There was a problem in importing your events.")
    } else {
      aggregate.forEach(function (outing){
        Events.find({'id': outing.id}, function (err, foundEvents){
          if (foundEvents.length < 1) {
            var eventData = createUpdateEventData(outing, {})
            var newEvent = new Events(eventData)
            newEvent.save(function (err) {
              if (err) console.error(err)
            })
          } else {
            var thisEvent = foundEvents[0]
            thisEvent = createUpdateEventData(outing, thisEvent)
            thisEvent.save(function (err) {
              if (err) console.error(err)
            })
          }
        })
      })
    }
  })
}

function getEvents(meetupid, callback) {
  request(meetupid, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var parsed = JSON.parse(body)
        return callback(null, parsed.results)
      }
    else {
      return callback(error, [])
    }
  })
}

function createUpdateEventData (event, original, brigade) {
  var eventData = original || {}
  eventData.id = event.id || ''
  eventData.title = event.name || ''
  eventData.url = event.event_url || ''
  eventData.description = event.description || ''
  eventData.location = event.venue.address_1 + ' ' +event.venue.city || ''
  eventData.hosts = event.venue.name || ''
  eventData.start = new Date(event.time).toLocaleString() || ''
  eventData.end = new Date(event.time + event.duration).toLocaleString() || ''
  return eventData
}

module.exports = mongoose.model('Events', eventsSchema)
