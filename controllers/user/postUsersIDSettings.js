/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/users/:userId/settings',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postUsersIDSettings
}

/**
 *  Controller
 */

function postUsersIDSettings (req, res) {
  res.redirect('/users/:userID/settings')
}
