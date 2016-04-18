
/* global SimpleMDE */
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
  var editor = new SimpleMDE({
    element: $('.simple-mde')[0],
    forceSync: true,
    indentWithTabs: false
  })
  console.log(editor)
})
function warning(currentuser, boxname) {
  var userbox = document.getElementsByName(boxname+'[superAdmin]')
  if (boxname == currentuser && !userbox[0].checked) {
    alert('Please be careful when changing your own Super Admin rights. You will need to contact another Super Admin to reinstate your privileges if you disable yours.')
  }
}