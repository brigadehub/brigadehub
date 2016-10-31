if (!window.console) window.console = {}
if (!window.console.log) window.console.log = function () {}
/* global SimpleMDE */
var $ = window.jQuery
var webfunctions = require('./functions.js')
var moment = require('moment')
require('moment-timezone')

window.__bh.colors = {
  label: '#EDAB43',
  text: '#8C8C8C'
}

$(document).ready(function () {
  $('.adminButton').click(function () {
    console.log($(this))
    webfunctions.adminWarning(window._currentUser, $(this).context.name.split('[')[0], $(this).context.checked)
  })
  $('#manageBlogForm').submit(function () {
    return webfunctions.validate($(this), 'post')
  })
  $('#manageProjectsForm').submit(function () {
    return webfunctions.validate($(this), 'project')
  })
  $('#manageEventsForm').submit(function () {
    return webfunctions.validate($(this), 'event')
  })
  console.log('%c-------------------------------------------------------------------------------------------', 'color:' + window.__bh.colors.label)
  console.log("                      \u2590\u2593\u2580\u2593\u2580\u2593\u2580\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593              \u2584\u2584\u2584                 \r\n                      \u2590\u2593\u2584\u2593\u2584\u2593\u2584\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593            \u2584\u2593\u2593\u2593                 \r\n              \u2593\u2593\u2593\u2593\u2593   \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593           \u2553\u2593\u2593\u2593   \u2552\u2593\u2593\u2584\u2584          \r\n          \u2584\u2593\u2593\u2593\u2593\u2593\u2593     \u2590\u2593\u2593\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2593\u2593\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2593\u2593\u2593          \u2554\u2593\u2593\u2593     \u2580\u2588\u2593\u2593\u2593\u2593\u2584\u2584      \r\n      \u2584\u2584\u2593\u2593\u2593\u2593\u2588\u2580\u2518       \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593          \u2590\u2593\u2593         \u2584\u2593\u2593\u2588         \u2559\u2580\u2588\u2593\u2593\u2593\u2593\u2584\u2584  \r\n    \u2593\u2593\u2593\u2593\u2593\u2593\u2593           \u2590\u2593\u2593\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2593\u2593          \u2590\u2593\u2593        \u2584\u2593\u2593\u2588              \u2559\u2593\u2593\u2593\u2593\u2593\u2593\r\n      \u2580\u2588\u2593\u2593\u2593\u2593\u2593\u2584        \u2590\u2593\u2593\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2593\u2593          \u2590\u2593\u2593       \u2584\u2593\u2593\u2588            ;\u2584\u2593\u2593\u2593\u2593\u2588\u2580\u2559 \r\n          \u2580\u2588\u2593\u2593\u2593\u2593\u2593\u2584    \u2590\u2593\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593      \u2584\u2593\u2593\u2588         ,\u2584\u2593\u2593\u2593\u2593\u2588\u2580\u2580     \r\n              \u2593\u2593\u2593\u2593\u258C   \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593     \u2584\u2593\u2593\u2588         \u2590\u2593\u2593\u2593\u2580\u2580.        \r\n                      \u2590\u2593\u2593\u2593\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2593\u2593\u2593    \u2584\u2593\u2593\u2588            \u00AC            \r\n                      \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593   \u2588\u2580\u2580                          \r\n __                                      __          __               __        \r\n/\\ \\             __                     /\\ \\        /\\ \\             /\\ \\       \r\n\\ \\ \\____  _ __ /\\_\\     __      __     \\_\\ \\     __\\ \\ \\___   __  __\\ \\ \\____  \r\n \\ \\ '__`\\/\\`'__\\/\\ \\  /'_ `\\  /'__`\\   /'_` \\  /'__`\\ \\  _ `\\/\\ \\/\\ \\\\ \\ '__`\\ \r\n  \\ \\ \\L\\ \\ \\ \\/ \\ \\ \\/\\ \\L\\ \\/\\ \\L\\.\\_/\\ \\L\\ \\/\\  __/\\ \\ \\ \\ \\ \\ \\_\\ \\\\ \\ \\L\\ \\\r\n   \\ \\_,__/\\ \\_\\  \\ \\_\\ \\____ \\ \\__/.\\_\\ \\___,_\\ \\____\\\\ \\_\\ \\_\\ \\____/ \\ \\_,__/\r\n    \\/___/  \\/_/   \\/_/\\/___L\\ \\/__/\\/_/\\/__,_ /\\/____/ \\/_/\\/_/\\/___/   \\/___/ \r\n                         /\\____/                                                \r\n                         \\_/__/      ")
  console.log('%c[Brigadehub]' + '%c v' + window.__bh.version, 'color:' + window.__bh.colors.label, 'color:' + window.__bh.colors.text)
  console.log('%c[Brigadehub]' + "%c Welcome hackers! We'd love to get your help in developing Brigadehub further!", 'color:' + window.__bh.colors.label, 'color:' + window.__bh.colors.text)
  console.log('%c             visit https://github.com/sfbrigade/brigadehub to find the code and learn more!', 'color:' + window.__bh.colors.text)
  console.log('%c-------------------------------------------------------------------------------------------', 'color:' + window.__bh.colors.label)
  var userzone = moment.tz.guess()
  if (window._events) {
    var eventsarray = window._events.map(function (event, i) {
      event.start = moment.unix(event.start).tz(userzone).format()
      $('.event' + i.toString()).html(moment.tz(event.start, userzone).format('ha z MMMM DD, YYYY'))
      return event
    })
    $('#events-calendar').fullCalendar({
      events: eventsarray
    })
  }
  $(window).on('scroll', function (event) {
    var scroll = $(window).scrollTop()
    if (scroll > 10) {
      $('body').addClass('scroll')
    } else {
      $('body').removeClass('scroll')
    }
  })
  if ($('.simple-mde').length) {
    console.log('SIMPLE MDE PRESENT', $('.simple-mde'))
    var editor = new SimpleMDE({ // eslint-disable-line no-unused-vars
      element: $('.simple-mde')[0],
      forceSync: true,
      indentWithTabs: false
    })
  }

  $('.input-tags-target').each(function () {
    $(this).tagsinput({
      typeaheadjs: [
        {
          hint: true,
          highlight: true,
          minLength: 2,
          trimValue: true
        }
      ]
    })
  })
  $('.edit-settings-row').each(function () {
    $(this).off('click')
    $(this).on('click', function (event) {
      var $parent = $(this).closest('tr')
      $parent.find('.static').each(function () {
        $(this).toggleClass('hidden')
      })
      $parent.find('.update').each(function () {
        $(this).toggleClass('hidden')
      })
    })
  })
  if ($('#blogtime').length) {
    $('#blogtime').val(moment().tz(userzone).format('MMMM Do YYYY, h:mm:ss a'))
  }
  $('#nav-toggle').on('click touchstart', function (event) {
    event.preventDefault()
    $('#nav-toggle, .nav-menu').toggleClass('active')
    $('.login-toggle, .account-menu').removeClass('active')
    $('body').toggleClass('fixed')
  })
  $('.login-toggle').on('click touchstart', function (event) {
    event.preventDefault()
    $('.login-toggle, .account-menu').toggleClass('active')
  })
})
