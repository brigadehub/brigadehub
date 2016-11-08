/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/users/:userId',
  middleware: [],
  controller: getUsersID
}

/**
 *  Controller
 */

function getUsersID (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/users/user', {
    view: 'user',
    userId: req.params.userId,
    title: 'Users',
    brigade: res.locals.brigade
  })
}
