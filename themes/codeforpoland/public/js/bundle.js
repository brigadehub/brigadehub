(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  adminWarning: function (currentuser, boxname) { // eslint-disable-line
    if (boxname === currentuser) {
      window.alert('Please be careful when changing your own Super Admin rights. You will need to contact another Super Admin to reinstate your privileges if you disable yours.')
    }
  },

  validate: function (form) { // eslint-disable-line
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
}

},{}],2:[function(require,module,exports){
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


},{"./functions.js":1}]},{},[2]);
