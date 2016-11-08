/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/users/new',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getUserNew
}

/**
 *  Controller
 */

function getUserNew (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/users/new', {
    view: 'user-new',
    title: 'New Users',
    brigade: res.locals.brigade
  })
}
