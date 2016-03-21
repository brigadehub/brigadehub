var $ = window.jQuery
$(document).ready(function () {
  console.log('running')
  if (window._events) {
    console.log(window._events)
    $('#events-calendar').fullCalendar({
      events: window._events
    })
  }
  $(window).on('scroll', function (event) {
    var scroll = $(window).scrollTop()
    console.log(scroll)
    if (scroll > 10) {
      $('body').addClass('scroll')
    } else {
      $('body').removeClass('scroll')
    }
  })
})
