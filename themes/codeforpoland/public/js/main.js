if (!window.console) window.console = {}
if (!window.console.log) window.console.log = function () {}
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
function adminWarning (currentuser, boxname) { // eslint-disable-line
  var userbox = document.getElementsByName(boxname + '[superAdmin]')
  if (boxname === currentuser && !userbox[0].checked) {
    window.alert('Please be careful when changing your own Super Admin rights. You will need to contact another Super Admin to reinstate your privileges if you disable yours.')
  }
}

function validate (form) { // eslint-disable-line
  var valid = true
  if (!valid) {
    window.alert('Please correct the errors in the form!')
    return false
  } else {
    var numToDelete = document.querySelectorAll('input[type="checkbox"]:checked#delete').length
    if (numToDelete === 0) {
      return true
    }
    var warning = 'Are you sure you want to delete ' + numToDelete + ' post' + (numToDelete > 1 ? 's' : '') + '?'
    return window.confirm(warning)
  }
}
