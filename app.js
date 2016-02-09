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
var dotenv = require('dotenv')
var MongoStore = require('connect-mongo/es5')(session)
var flash = require('express-flash')
var path = require('path')
var mongoose = require('mongoose')
var passport = require('passport')
var expressValidator = require('express-validator')
var sass = require('node-sass-middleware')
var _ = require('lodash')
var fs = require('fs')

var DB_INSTANTIATED

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env
 */
try {
  stats = fs.lstatSync(__dirname + '/.env')
  if (stats.isFile()) {
    dotenv.load({ path: '.env' })
  } else {
    throw new Error('.env is not a file!')
  }
} catch (e) {
  console.warn(e)
  console.warn('.env file not found. Defaulting to sample. Please copy .env.example to .env and populate with your own credentials.')
  dotenv.load({ path: '.env.example' })
}
/**
 * Controllers (route handlers).
 */
var homeCtrl = require('./controllers/home')
var eventsCtrl = require('./controllers/events')
var blogCtrl = require('./controllers/blog')
var projectsCtrl = require('./controllers/projects')
var aboutCtrl = require('./controllers/about')
var userCtrl = require('./controllers/user')
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
app.get('/login', userCtrl.getLogin)
app.post('/login', userCtrl.postLogin)
app.get('/login/edit', passportConf.isAuthenticated, userCtrl.getLoginEdit)
app.post('/login/edit', passportConf.isAuthenticated, userCtrl.postLoginEdit)
app.get('/logout', userCtrl.getLogout)
app.get('/about', aboutCtrl.getAbout)
app.get('/about/edit', passportConf.isAuthenticated, aboutCtrl.getAboutEdit)
app.post('/about', passportConf.isAuthenticated, aboutCtrl.postAbout)

/**
 * Meta Routes
 */

app.get('/account', passportConf.isAuthenticated, userCtrl.getAccount)
app.post('/account/profile', passportConf.isAuthenticated, userCtrl.postUpdateProfile)
app.post('/account/delete', passportConf.isAuthenticated, userCtrl.postDeleteAccount)

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
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/instagram', passport.authenticate('instagram'))
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/github', passport.authenticate('github'))
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }))
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }))
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})

/**
 * OAuth authorization routes. (API examples)
 */
app.get('/auth/foursquare', passport.authorize('foursquare'))
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function (req, res) {
  res.redirect('/api/foursquare')
})
app.get('/auth/tumblr', passport.authorize('tumblr'))
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function (req, res) {
  res.redirect('/api/tumblr')
})
app.get('/auth/venmo', passport.authorize('venmo', { scope: 'make_payments access_profile access_balance access_email access_phone' }))
app.get('/auth/venmo/callback', passport.authorize('venmo', { failureRedirect: '/api' }), function (req, res) {
  res.redirect('/api/venmo')
})
app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }))
app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), function (req, res) {
  res.redirect(req.session.returnTo || '/')
})

/**
 * Error Handler.
 */
app.use(errorHandler())

/**
 * Check if brigade exists before starting Express server.
 */
Brigade.find({slug: process.env.BRIGADE}, function (err, results) {
  if (!results.length) {
    console.log('No brigade with the slug ' + process.env.BRIGADE + ' found in database. Populating with default values.')
    var defaultBrigadeData = require('./config/default-brigade')()
    brigadeDetails = defaultBrigadeData
    var defaultBrigade = new Brigade(defaultBrigadeData)
    defaultBrigade.save(function (err) {
      if (err) return handleError(err)
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
