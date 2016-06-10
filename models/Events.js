var mongoose = require('mongoose')
var request = require('request')
var uuid = require('node-uuid')
var eventsSchema = new mongoose.Schema({
  // Follows fullcalendar's event object model, display options omitted:
  // http://fullcalendar.io/docs/event_data/Event_Object/
  id: {type: String, default: ''}, // this is the slug
  meetupid: {type: String, default: ''},
  title: {type: String, default: ''}, // Display title
  start: {type: String, default: ''}, // Moment-ish date, ISO8601 string, http://en.wikipedia.org/wiki/ISO_8601
  end: {type: String, default: ''}, // same ^^
  allDay: {type: Boolean, default: false}, // shows time of day or not
  url: {type: String, default: ''}, // an external link you can use to override where to go when clicking
  // These options are used within brigadehub for content storage
  description: {type: String, default: ''},
  location: {type: String, default: ''},
  host: {type: String, default: ''}
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
          Events.find({'meetupid': outing.id}, function (err, foundEvent) {
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
  var unixtime = Math.floor(event.time / 1000)
  eventData.meetupid = event.id
  eventData.id = uuid.v1()
  eventData.title = event.name || ''
  eventData.url = event.event_url || ''
  eventData.description = event.description || ''
  eventData.location = event.venue.address_1 + ' ' + event.venue.city || ''
  eventData.host = event.venue.name || ''
  eventData.start = unixtime || ''
  if (event.duration) {
    eventData.end = unixtime + Math.floor(event.duration / 1000)
  } else {
    eventData.end = ''
  }
  return eventData
}

module.exports = mongoose.model('Events', eventsSchema)
