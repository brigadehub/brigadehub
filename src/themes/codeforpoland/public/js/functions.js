module.exports = {
  adminWarning: function (currentuser, boxname, checked) { // eslint-disable-line
    if (boxname === currentuser && !checked) {
      window.alert('Please be careful when changing your own Super Admin rights. You will need to contact another Super Admin to reinstate your privileges if you disable yours.')
    }
  },

  validate: function (form, itemName) { // eslint-disable-line
    var valid = true
    if (!valid) {
      window.alert('Please correct the errors in the form!')
      return false
    } else {
      var numToDelete = document.querySelectorAll('input[type="checkbox"]:checked#delete').length
      if (numToDelete === 0) {
        return true
      }
      var warning = 'Are you sure you want to delete ' + numToDelete + ' ' + itemName + (numToDelete > 1 ? 's' : '') + '?'
      return window.confirm(warning)
    }
  }
}
