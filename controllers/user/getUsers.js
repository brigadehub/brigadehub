/**
 *  Dependencies
 */

var Users = require('models/Users')

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/users',
  middleware: [],
  controller: getUsers
}

/**
 *  Controller
 */

function getUsers (req, res) {
  Users.find({}, function (err, foundUsers) {
    if (err) console.error(err)
    res.render(res.locals.brigade.theme.slug + '/views/users/index', {
      view: 'user-list',
      title: 'Users',
      brigade: res.locals.brigade,
      users: foundUsers
    })
  })
}
