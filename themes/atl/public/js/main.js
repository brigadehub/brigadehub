var $ = window.jQuery
$(document).ready(function () {
  console.log('running')
  if (window._events) {
    console.log(window._events)
    $('#events-calendar').fullCalendar({
      events: window._events
    })
  }
})
