/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/logout',
  middleware: [],
  controller: getLogout
}

/**
 *  Controller
 */

function getLogout (req, res) {
  req.logout()
  res.redirect(req.session.returnTo || '/')
}
