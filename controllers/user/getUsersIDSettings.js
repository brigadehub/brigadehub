/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/users/:userId/settings',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getUsersIDSettings
}

/**
 *  Controller
 */

function getUsersIDSettings (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/users/settings', {
    view: 'user-settings',
    userId: req.params.userId,
    title: 'IDSettings Users',
    brigade: res.locals.brigade
  })
}
