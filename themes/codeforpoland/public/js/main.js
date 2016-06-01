if (!window.console) window.console = {}
if (!window.console.log) window.console.log = function () {}
/* global SimpleMDE */
var $ = window.jQuery
var webfunctions = require('./functions.js')
$(document).ready(function () {
  console.log('running')
  $('.adminButton').click(function () {
    webfunctions.adminWarning(window._currentUser, $(this).context.name.split('[')[0])
  })
  $('#blogform').submit(function () {
    webfunctions.validate($(this))
  })
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

