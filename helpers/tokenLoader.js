var selectn = require('selectn')
module.exports = function(passport, auth){
  // console.log(passport._strategies)
  // Github
  if(
    selectn('_strategies.github._oauth2._clientId', passport) &&
    selectn('_strategies.github._oauth2._clientId', passport) !== auth.github.clientId
  ) {
    passport._strategies.github._oauth2._clientId = auth.github.clientId
  }
  if(
    selectn('_strategies.github._oauth2._clientSecret', passport) &&
    selectn('_strategies.github._oauth2._clientSecret', passport) !== auth.github.clientSecret
  ) {
    passport._strategies.github._oauth2._clientSecret = auth.github.clientSecret
  }

  // Meetup
  if(
    selectn('_strategies.meetup._oauth._consumerKey', passport) &&
    selectn('_strategies.meetup._oauth._consumerKey', passport) !== auth.meetup.consumerKey
  ) {
    passport._strategies.meetup._oauth._consumerKey = auth.meetup.consumerKey
  }
  if(
    selectn('_strategies.meetup._oauth._consumerSecret', passport) &&
    selectn('_strategies.meetup._oauth._consumerSecret', passport) !== auth.meetup.consumerSecret
  ) {
    passport._strategies.meetup._oauth._consumerSecret = auth.meetup.consumerSecret
  }

  // TODO load Slack dynamic auth tokens

}
