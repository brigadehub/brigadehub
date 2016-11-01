const Models = {
  checkins: require('../../../models/Checkins'),
  brigade: require('../../../models/Brigade'),
  events: require('../../../models/Events'),
  posts: require('../../../models/Posts'),
  projects: require('../../../models/Projects'),
  users: require('../../../models/Users')
}
const _ = require('lodash')

const dateFields = [
  'date',
  'createdAt',
  'lastLoggedIn',
  'lastCheckin'
]

module.exports = function (req, res, next) {
  const model = req.params.model
  const type = req.query.type
  let query = req.query.query || '{}'
  try {
    query = JSON.parse(query)
  } catch (e) {
    res.send(400, { error: 'query is not parsable' })
  }

  dateFields.forEach(function (field) {
    if (query[field]) {
      if (typeof query[field] === 'string') {
        query[field] = new Date(query[field])
      } else {
        _.forEach(query[field], function (value, key) {
          query[field][key] = new Date(query[field][key])
        })
      }
    }
  })

  Models[model][type](query, function (err, results) {
    res.send({ error: err, data: results })
  })
}
