const core = require('brigadehub-core')
var pkg = require('./package.json')
var brigade = require('./brigade')

const bhConfig = {
  dotenv: require('./dotenv')(),
  info: '[Brigadehub]',
  version: pkg.version,
  brigade: brigade
}
core(bhConfig)
