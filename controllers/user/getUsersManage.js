/**
 *  Dependencies
 */

var Users = require('models/Users')

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/users/manage',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getUsersManage
}

/**
 *  Controller
 */

function getUsersManage (req, res) {
  console.log('getUsersManage')
  Users.find({}, function (err, foundUsers) {
    if (err) console.error(err)
    res.render(res.locals.brigade.theme.slug + '/views/users/manage', {
      currentuser: req.user,
      view: 'user-list-manage',
      title: 'Manage Users',
      brigade: res.locals.brigade,
      users: foundUsers
    })
  })
}
