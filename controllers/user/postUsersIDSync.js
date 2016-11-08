/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/users/:userid/sync',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postUsersIDSync
}

/**
 *  Controller
 */

function postUsersIDSync (req, res) {
  res.redirect('/users/:userID/settings')
}
