/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/login/edit',
  authenticated: true,
  roles: [
    'core',
    'superAdmin'
  ],
  middleware: [],
  controller: getLoginEdit
}

/**
 *  Controller
 */

function getLoginEdit (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/account/login-edit', {
    view: 'login-edit',
    title: 'Login Edit',
    brigade: res.locals.brigade
  })
}
