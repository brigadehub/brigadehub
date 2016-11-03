/**
 * Check Node Version FIRST
 */
require('node-version-checker')

/**
 *  Set up RELATIVE REQUIRE PATHING
 *  e.g. require('models/Posts')
 *       instead of require('../../../../../models/Posts')
 */
require('app-module-path/register')

/**
 * Module dependencies.
 */
var express = require('express')
var _ = require('lodash')
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
var requireDir = require('require-dir')
var pkg = require('./package.json')

// Segment server-side tracking
var Analytics = require('analytics-node')
var analytics // placeholder for instantiated client

require('colors')
/* var _ = require('lodash') */

console.log("                      \u2590\u2593\u2580\u2593\u2580\u2593\u2580\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593              \u2584\u2584\u2584                 \r\n                      \u2590\u2593\u2584\u2593\u2584\u2593\u2584\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593            \u2584\u2593\u2593\u2593                 \r\n              \u2593\u2593\u2593\u2593\u2593   \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593           \u2553\u2593\u2593\u2593   \u2552\u2593\u2593\u2584\u2584          \r\n          \u2584\u2593\u2593\u2593\u2593\u2593\u2593     \u2590\u2593\u2593\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2593\u2593\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2593\u2593\u2593          \u2554\u2593\u2593\u2593     \u2580\u2588\u2593\u2593\u2593\u2593\u2584\u2584      \r\n      \u2584\u2584\u2593\u2593\u2593\u2593\u2588\u2580\u2518       \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593          \u2590\u2593\u2593         \u2584\u2593\u2593\u2588         \u2559\u2580\u2588\u2593\u2593\u2593\u2593\u2584\u2584  \r\n    \u2593\u2593\u2593\u2593\u2593\u2593\u2593           \u2590\u2593\u2593\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2593\u2593          \u2590\u2593\u2593        \u2584\u2593\u2593\u2588              \u2559\u2593\u2593\u2593\u2593\u2593\u2593\r\n      \u2580\u2588\u2593\u2593\u2593\u2593\u2593\u2584        \u2590\u2593\u2593\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2593\u2593          \u2590\u2593\u2593       \u2584\u2593\u2593\u2588            ;\u2584\u2593\u2593\u2593\u2593\u2588\u2580\u2559 \r\n          \u2580\u2588\u2593\u2593\u2593\u2593\u2593\u2584    \u2590\u2593\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593      \u2584\u2593\u2593\u2588         ,\u2584\u2593\u2593\u2593\u2593\u2588\u2580\u2580     \r\n              \u2593\u2593\u2593\u2593\u258C   \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593     \u2584\u2593\u2593\u2588         \u2590\u2593\u2593\u2593\u2580\u2580.        \r\n                      \u2590\u2593\u2593\u2593\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2593\u2593\u2593    \u2584\u2593\u2593\u2588            \u00AC            \r\n                      \u2590\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593   \u2588\u2580\u2580                          \r\n __                                      __          __               __        \r\n/\\ \\             __                     /\\ \\        /\\ \\             /\\ \\       \r\n\\ \\ \\____  _ __ /\\_\\     __      __     \\_\\ \\     __\\ \\ \\___   __  __\\ \\ \\____  \r\n \\ \\ '__`\\/\\`'__\\/\\ \\  /'_ `\\  /'__`\\   /'_` \\  /'__`\\ \\  _ `\\/\\ \\/\\ \\\\ \\ '__`\\ \r\n  \\ \\ \\L\\ \\ \\ \\/ \\ \\ \\/\\ \\L\\ \\/\\ \\L\\.\\_/\\ \\L\\ \\/\\  __/\\ \\ \\ \\ \\ \\ \\_\\ \\\\ \\ \\L\\ \\\r\n   \\ \\_,__/\\ \\_\\  \\ \\_\\ \\____ \\ \\__/.\\_\\ \\___,_\\ \\____\\\\ \\_\\ \\_\\ \\____/ \\ \\_,__/\r\n    \\/___/  \\/_/   \\/_/\\/___L\\ \\/__/\\/_/\\/__,_ /\\/____/ \\/_/\\/_/\\/___/   \\/___/ \r\n                         /\\____/                                                \r\n                         \\_/__/      ")
console.log('[Brigadehub]'.yellow + ' v' + pkg.version)

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
var eventsCtrl = require('./controllers/events')
var blogCtrl = require('./controllers/blog')
var projectsCtrl = require('./controllers/projects')
var contactCtrl = require('./controllers/contact')
var brigadeCtrl = require('./controllers/brigade')
var checkinCtrl = require('./controllers/checkin')
var dashboardCtrl = require('./controllers/dashboard')
var APIctrl = require('./controllers/api')

const controllers = requireDir('./controllers', {recurse: true})
const middleware = requireDir('./middleware', {recurse: true})

/*
 * Helpers
 */
var helpers = requireDir('./helpers')

var brigadeDetails

/**
 * Create Express server.
 */
var app = express()

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI, function (err) {
  if (err) throw new Error(err)
})
mongoose.connection.on('error', function (err) {
  console.log('There was an error while trying to connect!')
  throw new Error(err)
})

/**
 * Check Model Settings in db
 */
var Brigade = require('./models/Brigade')

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 5465)
app.set('views', path.join(__dirname, 'themes'))
app.locals.capitalize = function (value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
app.locals.plural = function (value) {
  if (value[value.length - 1] === 's') {
    return value + 'es'
  }
  return value + 's'
}
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
    // bootstrap segment tracking
    if (!analytics && res.locals.brigade.auth.segment.writeKey.length) {
      analytics = new Analytics(res.locals.brigade.auth.segment.writeKey)
    }
    req.analytics = analytics || {
      track: () => {},
      page: () => {},
      identify: () => {},
      group: () => {},
      alias: () => {}
    }

    res.locals.brigade.buildVersion = pkg.version
    helpers.tokenLoader(passport, res.locals.brigade.auth)
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
function shouldSaveReturnToPath (path) {
  if ( // blacklist redirectTo URLs
    path.indexOf('/css/') < 0 &&
    path.indexOf('/js/') < 0 &&
    path.indexOf('/fonts/') < 0 &&
    path.indexOf('/img/') < 0 &&
    path.indexOf('/auth/') < 0 &&
    path.indexOf('/api/') < 0 &&
    path.indexOf('/login') < 0 &&
    path.indexOf('/favico') < 0 &&
    path.indexOf('/logout') < 0
    ) return true
  return false
}
app.use(function (req, res, next) {
  // check postAuthLink and see if going to auth callback
  if (shouldSaveReturnToPath(req.path)) {
    console.log('returnTo', req.path)
    req.session.returnTo = req.path
  }
  res.locals.user = req.user
  next()
})
app.use(function (req, res, next) {
  req.previousURL = req.header('Referer') || '/'
  next()
})

/**
 *  Dynamically Generated Routes
 */

/**
 * Static param routes.
 */
const dynamicRoutes = {}
for (let ctrlFolderName in controllers) {
  const ctrlFolder = controllers[ctrlFolderName]
  if (_.isObject(ctrlFolder)) {
    for (let ctrlName in ctrlFolder) {
      const ctrl = ctrlFolder[ctrlName]
      if (ctrl.endpoint) {
        if (ctrl.endpoint.indexOf(':') > -1) {
          const endpointArray = ctrl.endpoint.split(':')
          const dynamicLevel = endpointArray.length - 1
          dynamicRoutes[dynamicLevel] = dynamicRoutes[dynamicLevel] || []
          dynamicRoutes[dynamicLevel].push(ctrl)
        } else {
          constructEndpoint(ctrl, app)
        }
      }
    }
  }
}

/**
 *  Dynamic param routes
 */

for (let dynamicLevel in dynamicRoutes) {
  const ctrls = dynamicRoutes[dynamicLevel]
  for (let ctrlIndex in ctrls) {
    const ctrl = ctrls[ctrlIndex]
    if (ctrl.endpoint) {
      constructEndpoint(ctrl, app)
    }
  }
}

/**
 * constructEndpoint - Instantiate express routes
 *
 * @param  {Object} ctrl controller object
 * @param  {Object} app  Express Application
 */
function constructEndpoint (ctrl, app) {
  let ctrlParams = [ctrl.endpoint]
  if (ctrl.authenticated) ctrlParams.push(middleware.passport.isAuthenticated)
  if (ctrl.roles) ctrlParams.push(middleware.passport.checkRoles(ctrl.roles))
  if (ctrl.scopes) ctrlParams.push(middleware.passport.checkScopes(ctrl.scopes))

  // set other middleware
  ctrl.middleware = ctrl.middleware.map(function (mwName) {
    return middleware[mwName]
  })
  ctrlParams = ctrlParams.concat(ctrl.middleware)

  // set final controller
  ctrlParams.push(ctrl.controller)

  // apply configuration and run on express
  app[ctrl.method].apply(app, ctrlParams)
}

/**
 *  Resume normal routes
 */

app.get('/contact', contactCtrl.getContact)
app.post('/contact', contactCtrl.postContact)
app.get('/contact/edit', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), contactCtrl.getContactEdit)
app.post('/contact/message/new', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), contactCtrl.postContactMessage)

/**
 *  API routes
 */

app.get('/api/models/:model', APIctrl.get.models)

/**
 * Meta Routes
 */

app.get('/brigade', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), brigadeCtrl.getBrigade)
app.post('/brigade', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), brigadeCtrl.postBrigade)
app.get('/brigade/dashboard', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), dashboardCtrl.getDashboard)

/**
 * Meta Routes
 */

app.get('/checkin', checkinCtrl.getCheckin)
app.post('/checkin', checkinCtrl.postCheckin)

/**
 * Project routes.
 */
app.get('/projects', projectsCtrl.getProjects)
app.get('/projects/manage', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['lead', 'core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo']), projectsCtrl.getProjectsManage)
app.post('/projects/manage', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['lead', 'core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo']), projectsCtrl.postProjectsManage)
app.post('/projects/sync', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), projectsCtrl.postProjectsSync)
app.get('/projects/new', middleware.passport.isAuthenticated, projectsCtrl.getProjectsNew)
app.post('/projects/new', middleware.passport.isAuthenticated, projectsCtrl.postProjectsNew)
app.get('/projects/:projectId', projectsCtrl.getProjectsID)
app.post('/projects/:projectId', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['lead', 'core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo']), projectsCtrl.postProjectsIDSettings)
app.get('/projects/:projectId/settings', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['lead', 'core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo']), projectsCtrl.getProjectsIDSettings)
app.post('/projects/:projectId/sync', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['lead', 'core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo']), projectsCtrl.postProjectsIDSync)
app.post('/projects/:projectId/delete', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['lead', 'core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo']), projectsCtrl.postDeleteProject)

/**
 * Events routes.
 */
app.get('/events', eventsCtrl.getEvents)
app.get('/events/manage', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.getEventsManage)
app.post('/events/manage', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postEventsManage)
app.post('/events/sync', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postEventsSync)
app.get('/events/new', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.getEventsNew)
app.post('/events/new', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postEventsNew)
app.post('/events/delete', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postDeleteAllEvents)
app.get('/events/:eventId', eventsCtrl.getEventsID)
app.post('/events/:eventId', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postEventsIDSettings)
app.get('/events/:eventId/settings', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.getEventsIDSettings)
app.post('/events/:eventId/sync', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postEventsIDSync)
app.post('/events/:eventId/delete', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), middleware.passport.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']), eventsCtrl.postDeleteEvent)

/**
 * Blog routes.
 */
app.get('/blog', blogCtrl.getBlog)
app.get('/blog/manage', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.getBlogManage)
app.post('/blog/manage', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.postBlogManage)
app.post('/blog/sync/:type', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin']), blogCtrl.postBlogSync)
app.get('/blog/new', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.getBlogNew)
app.post('/blog/new', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.postBlogNew)
app.get('/blog/post/:blogId', blogCtrl.getBlogID)
app.post('/blog/post/:blogId', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.postBlogIDEdit)
app.get('/blog/post/:blogId/edit', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.getBlogIDEdit)
app.post('/blog/:blogId/sync', middleware.passport.isAuthenticated, middleware.passport.checkRoles(['core', 'superAdmin', 'coreLead', 'blog', 'lead']), blogCtrl.postBlogIDSync)

app.post('/blog/post/:blogId/delete', middleware.passport.isAuthenticated, blogCtrl.postBlogIDDelete)
app.get('/author/:authorId', middleware.passport.isAuthenticated, blogCtrl.getAuthorId)

/**
 * Users routes.
 */

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/github', passport.authenticate('github', {
  scope: [ 'user', 'public_repo' ]
}))
app.get('/auth/github/elevate', middleware.passport.elevateScope)
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
  console.log('new github callback!', req.session.returnTo)
  res.redirect(req.session.returnTo || '/')
})
app.get('/auth/meetup', passport.authenticate('meetup', { scope: ['basic', 'rsvp'] }))
app.get('/auth/meetup/callback', passport.authenticate('meetup', { failureRedirect: '/account' }), function (req, res) {
  res.redirect(req.session.returnTo || '/account')
})

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
    var defaultBrigadeData = require('./seeds/development/Brigade')()[0]
    defaultBrigadeData.slug = process.env.BRIGADE
    brigadeDetails = defaultBrigadeData
    var defaultBrigade = new Brigade(defaultBrigadeData)
    defaultBrigade.save(function (err) {
      if (err) throw err
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
  app.use(function (req, res, next) {
    if (_.filter(res.locals.brigade.redirects, {endpoint: req.path}).length) {
      var redirect = _.filter(res.locals.brigade.redirects, {endpoint: req.path})[0]
      if (redirect.type === 'permanent') {
        return res.redirect(301, redirect.destination)
      }
      return res.redirect(redirect.destination)
    }
    next()
  })
  app.use(favicon(path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public', 'favicon.png')))
  app.use(express.static(path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'), { maxAge: 31557600000 }))
  app.listen(app.get('port'), function () {
    console.log('[Brigadehub]'.yellow + ' Server listening on port', app.get('port'))
  })
}

module.exports = app
