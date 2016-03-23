/**
 * Check Node Version FIRST
 */
require('node-version-checker')

/**
 * Module dependencies.
 */
var express = require('express')
var cookieParser = require('cookie-parser')
var compress = require('compression')
var favicon = require('serve-favicon')
var session = require('express-session')
var bodyParser = require('body-parser')
var logger = require('morgan')
var errorHandler = require('errorhandler')
var lusca = require('lusca')
var methodOverride = require('method-override')
var MongoStore = require('connect-mongo/es5')(session)
var flash = require('express-flash')
var mongoose = require('mongoose')
var passport = require('passport')
var expressValidator = require('express-validator')
var sass = require('node-sass-middleware')
var path = require('path')
/* var _ = require('lodash') */

var DB_INSTANTIATED

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env
 */
require('./dotenv.js')()
/**
 * Controllers (route handlers).
 */
var homeCtrl = require('./controllers/home')
var eventsCtrl = require('./controllers/events')
var blogCtrl = require('./controllers/blog')
var projectsCtrl = require('./controllers/projects')
var contactCtrl = require('./controllers/contact')
var usersCtrl = require('./controllers/user')
var brigadeCtrl = require('./controllers/brigade')

var brigadeDetails

/**
 * API keys and Passport configuration.
 */
var passportConf = require('./config/passport')

/**
 * Create Express server.
 */
var app = express()

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI)
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})

/**
 * Check Brigade Settings in db
 */
var Brigade = require('./models/Brigade')

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 5465)
app.set('views', path.join(__dirname, 'themes'))
app.set('view engine', 'jade')
app.use(compress())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(methodOverride())
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}))
/* Check if db is connected */
app.use(checkDB)
function checkDB (req, res, next) {
  if (!DB_INSTANTIATED) {
    return setTimeout(function () {
      checkDB(req, res, next)
    }, 500)
  }
  next()
}
/* Attach brigade info to req */
app.use(function (req, res, next) {
  Brigade.find({}, function (err, results) {
    if (err) throw err
    if (!results.length) throw new Error('BRIGADE NOT IN DATABASE')
    res.locals = res.locals || {}
    res.locals.brigade = results[0]
    next()
  })
})
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}))
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})
app.use(function (req, res, next) {
  if (/api/i.test(req.path)) {
    req.session.returnTo = req.path
  }
  next()
})

/**
 * Primary app routes.
 */
app.get('/', homeCtrl.index)
app.get('/login', usersCtrl.getLogin)
app.post('/login', usersCtrl.postLogin)
app.get('/login/edit', passportConf.isAuthenticated, usersCtrl.getLoginEdit)
app.post('/login/edit', passportConf.isAuthenticated, usersCtrl.postLoginEdit)
app.get('/logout', usersCtrl.getLogout)
app.get('/contact', contactCtrl.getContact)
app.get('/contact/edit', passportConf.isAuthenticated, contactCtrl.getContactEdit)
app.get('/contact/form', contactCtrl.getContactForm)
app.post('/contact', passportConf.isAuthenticated, contactCtrl.postContact)

/**
 * Meta Routes
 */

app.get('/account', passportConf.isAuthenticated, usersCtrl.getAccount)
app.post('/account/profile', passportConf.isAuthenticated, usersCtrl.postUpdateProfile)
app.post('/account/delete', passportConf.isAuthenticated, usersCtrl.postDeleteAccount)

app.get('/brigade', passportConf.isAuthenticated, brigadeCtrl.getBrigade)
app.post('/brigade', passportConf.isAuthenticated, brigadeCtrl.postBrigade)

/**
 * Project routes.
 */
app.get('/projects', projectsCtrl.getProjects)
app.get('/projects/manage', passportConf.isAuthenticated, projectsCtrl.getProjectsManage)
app.post('/projects/manage', passportConf.isAuthenticated, projectsCtrl.postProjectsManage)
app.post('/projects/sync', passportConf.isAuthenticated, projectsCtrl.postProjectsSync)
app.get('/projects/new', passportConf.isAuthenticated, projectsCtrl.getProjectsNew)
app.post('/projects/new', passportConf.isAuthenticated, projectsCtrl.postProjectsNew)
app.get('/projects/:projectId', projectsCtrl.getProjectsID)
app.post('/projects/:projectId', passportConf.isAuthenticated, projectsCtrl.postProjectsIDSettings)
app.get('/projects/:projectId/settings', passportConf.isAuthenticated, projectsCtrl.getProjectsIDSettings)
app.post('/projects/:projectId/sync', passportConf.isAuthenticated, projectsCtrl.postProjectsIDSync)

/**
 * Events routes.
 */
app.get('/events', eventsCtrl.getEvents)
app.get('/events/manage', passportConf.isAuthenticated, eventsCtrl.getEventsManage)
app.post('/events/manage', passportConf.isAuthenticated, eventsCtrl.postEventsManage)
app.post('/events/sync', passportConf.isAuthenticated, eventsCtrl.postEventsSync)
app.get('/events/new', passportConf.isAuthenticated, eventsCtrl.getEventsNew)
app.post('/events/new', passportConf.isAuthenticated, eventsCtrl.postEventsNew)
app.get('/events/:eventId', eventsCtrl.getEventsID)
app.post('/events/:eventId', passportConf.isAuthenticated, eventsCtrl.postEventsIDSettings)
app.get('/events/:eventId/settings', passportConf.isAuthenticated, eventsCtrl.getEventsIDSettings)
app.post('/events/:eventId/sync', passportConf.isAuthenticated, eventsCtrl.postEventsIDSync)

/**
 * Blog routes.
 */
app.get('/blog', blogCtrl.getBlog)
app.get('/blog/manage', passportConf.isAuthenticated, blogCtrl.getBlogManage)
app.post('/blog/manage', passportConf.isAuthenticated, blogCtrl.postBlogManage)
app.post('/blog/sync', passportConf.isAuthenticated, blogCtrl.postBlogSync)
app.get('/blog/new', passportConf.isAuthenticated, blogCtrl.getBlogNew)
app.post('/blog/new', passportConf.isAuthenticated, blogCtrl.postBlogNew)
app.get('/blog/:blogId', blogCtrl.getBlogID)
app.post('/blog/:blogId', passportConf.isAuthenticated, blogCtrl.postBlogIDEdit)
app.get('/blog/:blogId/edit', passportConf.isAuthenticated, blogCtrl.getBlogIDEdit)
app.post('/blog/:blogId/sync', passportConf.isAuthenticated, blogCtrl.postBlogIDSync)

/**
 * Users routes.
 */
app.get('/users', usersCtrl.getUsers)
app.get('/users/manage', passportConf.isAuthenticated, usersCtrl.getUsersManage)
app.post('/users/manage', passportConf.isAuthenticated, usersCtrl.postUsersManage)
app.post('/users/sync', passportConf.isAuthenticated, usersCtrl.postUsersSync)
app.get('/users/new', passportConf.isAuthenticated, usersCtrl.getUsersNew)
app.post('/users/new', passportConf.isAuthenticated, usersCtrl.postUsersNew)
app.get('/users/:userId', usersCtrl.getUsersID)
app.post('/users/:userId', passportConf.isAuthenticated, usersCtrl.postUsersIDSettings)
app.get('/users/:userId/settings', passportConf.isAuthenticated, usersCtrl.getUsersIDSettings)
app.post('/users/:userId/sync', passportConf.isAuthenticated, usersCtrl.postUsersIDSync)

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/github', passport.authenticate('github', {
  scope: [
    'user',
    'repo',
    'repo_deployment',
    'repo:status',
    'admin:repo_hook',
    'admin:org_hook',
    'read:org',
    'write:org',
    'admin:org'
  ]
}))
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/meetup', passport.authenticate('meetup', { scope: ['basic', 'rsvp'] }))
app.get('/auth/meetup/callback', passport.authenticate('meetup', { failureRedirect: '/account' }), function (req, res) {
  res.redirect(req.session.returnTo || '/account')
})

app.get('/auth/disconnect/:service', passportConf.isAuthenticated, usersCtrl.disconnectService)
/**
 * Error Handler.
 */
app.use(errorHandler())

/**
 * Check if brigade exists before starting Express server.
 */
Brigade.find({slug: process.env.BRIGADE}, function (err, results) {
  if (err) throw err
  if (!results.length) {
    console.log('No brigade with the slug ' + process.env.BRIGADE + ' found in database. Populating with default values.')
    var defaultBrigadeData = require('./config/default-brigade')()
    defaultBrigadeData.slug = process.env.BRIGADE
    brigadeDetails = defaultBrigadeData
    var defaultBrigade = new Brigade(defaultBrigadeData)
    defaultBrigade.save(function (err) {
      if (err) throw err
      console.log('Default Brigade populated into database.')
      DB_INSTANTIATED = true
      startServer()
    })
  } else {
    DB_INSTANTIATED = true
    brigadeDetails = results[0]
    startServer()
  }
})
function startServer () {
  app.use(sass({
    src: path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'),
    dest: path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'),
    debug: true,
    sourceMap: true,
    outputStyle: 'expanded'
  }))
  app.use(favicon(path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public', 'favicon.png')))
  app.use(express.static(path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'), { maxAge: 31557600000 }))
  app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'))
  })
}

module.exports = app
