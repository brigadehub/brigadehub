var mongoose = require('mongoose')

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
  cb(null, isMatch)
}

eventsSchema.methods.fetchMeetupEvents = function (cb) {
  cb(null, isMatch)
}

module.exports = mongoose.model('Events', eventsSchema)
