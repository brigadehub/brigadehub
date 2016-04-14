var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')
var mongoose = require('mongoose')
var request = require('request')
var _ = require('lodash')
var linkHeaderParser = require('link-header-parser')

var defaultHeaders = {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': 'token ',
  'User-Agent': 'BridageHub'
}

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  /* password: String,*/
  github: String,
  tokens: Array,
  roles: {
    read: {type: Boolean, default: true},
    blog: {type: Boolean, default: false},
    project: {type: Boolean, default: false},
    lead: {type: Boolean, default: false},
    core: {type: Boolean, default: false},
    coreLead: {type: Boolean, default: false},
    superAdmin: {type: Boolean, default: false}
  },
  teams: {
    project: { type: Array, default: [] },
    core: { type: Array, default: [] }
  },
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' },
    showcontact: { type: Boolean, default: true },
    position: { type: String, default: '' }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

/**
 * middleware.
 */
userSchema.pre('save', function (next) {
  return next()
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size) {
  if (!size) {
    size = 200
  }
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro'
  }
  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'
}

/**
 * Helper method for getting user's authorized to edit the blog.
 */
userSchema.methods.canEditBlog = function () {
  return (this.roles.core || this.roles.superAdmin || this.roles.coreLead || this.roles.blog || this.roles.lead)
}

/**
 * Helper method to see if auth is authorized
 */
userSchema.methods.checkAuth = function (authName) {
  if (_.filter(this.tokens, { kind: authName }).length) {
    return true
  }
  return false
}
userSchema.statics.fetchGithubUsers = function (brigade, user, cb) {
  var Users = this
  var url = 'https://api.github.com/orgs/' + brigade.slug + '/members'
  getUsers(url, [], user, function (err, aggregate) {
    if (err) {
      console.error(err)
      throw err
    }
    // massage data, fetch civic.json files
    // update/save all in schema
    console.log('got users!')
    var mongooseActions = []
    aggregate.forEach(function (user) {
      function buildPromise (constructedUser) {
        return new Promise(function (resolve, reject) {
          console.log(constructedUser)
          Users.find({username: constructedUser.login}, function (err, foundUser) {
            if (err) {
              console.error(err)
              throw err
            }
            if (!foundUser.length) {
              console.log('creating', constructedUser.login, new Date().toString())
              var userData = createUpdateUserData(constructedUser, {}, brigade)
              var newUser = new Users(userData)
              newUser.save(function (err) {
                if (err) {
                  console.error(err)
                  throw err
                }
                resolve()
              })
            } else { // user already exists, needs updating
              console.log('updating', constructedUser.login, new Date().toString())
              var thisUser = foundUser[0]
              thisUser = createUpdateUserData(constructedUser, thisUser, brigade)
              thisUser.save(function (err) {
                if (err) {
                  console.error(err)
                  throw err
                }
                resolve()
              })
            }
          })
        })
      }
      mongooseActions.push(buildPromise(user))
    })
    return Promise.all(mongooseActions)
      .then(function () {
        cb()
      })
      .catch(function (err) {
        throw err
      })
  })
}

module.exports = mongoose.model('Users', userSchema)

function getUsers (url, aggregate, user, callback) {
  var headers = _.cloneDeep(defaultHeaders)
  headers['Authorization'] += user.tokens[0].accessToken
  var options = {
    url: url,
    headers: headers
  }
  console.log('calling aggregate')
  request(options, function (err, response, body) {
    if (err) return callback(err, aggregate)
    if (!err && response.statusCode === 200) {
      var parsed = JSON.parse(body)
      aggregate = aggregate.concat(parsed)
      aggregate = _.uniq(aggregate)
      console.log('aggregate count', aggregate.length)
      // if there's a next link in header, call that recursively
      var linkHeader = linkHeaderParser(response.headers.link)
      if (linkHeader.next) {
        console.log('next header exists!')
        return getUsers(linkHeader.next.url, aggregate, user, callback)
      }
      console.log("next header doesn't exist!")
      return callback(null, aggregate)
    }
    callback({msg: 'Status Code not 200', response: response, body: body}, aggregate)
  })
}
function createUpdateUserData (user, original, brigade) {
  original = original || {}
  // Standardize data
  original.email = user.email
  original.password = original.password || ''
  original.github = original.github || user.id
  original.username = user.login
  original.steam = original.steam || ''
  original.tokens = original.tokens || []
  original.roles = original.roles || {}
  original.roles.read = true
  original.profile = original.profile || {}
  original.profile.name = original.profile.name || ''
  original.profile.gender = original.profile.gender || ''
  original.profile.location = original.profile.location || ''
  original.profile.website = original.profile.website || user.url
  original.profile.picture = original.profile.picture || user.avatar_url
  return original
}
