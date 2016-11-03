/**
 *  Dependencies
 */

var Users = require('models/Users')

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/users/manage',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postUsersManage
}

/**
 *  Controller
 */

// TODO(therebelrobot): this logic look SUUUUUPER broken. Will need to readress.
function postUsersManage (req, res) {
  Users.find({}, function (err, foundUsers) {
    if (err) console.log(err)
    for (var i = 0; i < foundUsers.length; i++) {
      var user = new Users(foundUsers[i])
      if (req.body[foundUsers[i].username]) {
        req.body[user.username].blogRole ? user.roles.blog = true : user.roles.blog = false
        req.body[user.username].projectRole ? user.roles.project = true : user.roles.project = false
        req.body[user.username].projectLeadRole ? user.roles.lead = true : user.roles.lead = false
        req.body[user.username].coreRole ? user.roles.core = true : user.roles.core = false
        req.body[user.username].coreLeadRole ? user.roles.coreLead = true : user.roles.coreLead = false
        req.body[user.username].superAdmin ? user.roles.superAdmin = true : user.roles.superAdmin = false
      } else {
        user.roles.superAdmin = false
        user.roles.coreLead = false
        user.roles.core = false
        user.roles.lead = false
        user.roles.project = false
        user.roles.blog = false
      }
      user.save(function (err) {
        if (err) console.log(err)
      })
    }
  })
  res.redirect('/users/manage')
}
