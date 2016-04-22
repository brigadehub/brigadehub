var faker = require('faker')

function generateWisdom () {
  var start = ['Never forget to', 'To be human is to', 'In the end we all need to', 'Above all you will', 'Some souls will', 'Remember to', 'You deserve to', 'We were born to', 'Starting today', 'The truth is everyone will', 'Mistakes are how you learn to', 'Success is learning to', 'Take time every day to', 'Life is about remembering to']
  var verb = ['breath', 'live', 'watch', 'achieve', 'ache', 'accept', 'annunciate', 'befriend', 'blush', 'concede', 'encode', 'foretell', 'imagine', 'imply', 'inspire', 'observe', 'permit', 'ponder', 'postulate', 'rave', 'rhyme', 'snack', 'uphold', 'wander', 'worship', 'work', 'weep', 'view', 'triumph', 'travel', 'thrive', 'terrify', 'tend', 'taste', 'survive', 'suffer', 'subscribe', 'stride', 'steep', 'sneeze', 'snap', 'slink', 'shout', 'shiver', 'select', 'scrawl', 'sacrifice', 'review', 'pretend', 'proceed', 'preach']
  var noun = ['understanding', 'wisdom', 'strength', 'courage', 'love', 'silence', 'happiness', 'warmth', 'freedom', 'absurdness', 'artfulness', 'bitterness', 'candidness', 'conciseness', 'sophistication', 'backbone', 'brilliance', 'brutality', 'charity', 'coldness', 'Compassion', 'Confidence', 'Contentment', 'Courage', 'Curiosity', 'Dedication', 'Determination', 'Elegance', 'Enthusiasm', 'Envy', 'Fear', 'Generosity', 'Goodness', 'Graciousness', 'Hatred', 'Honesty', 'Honor', 'Hope', 'Humility', 'Humor', 'Insanity', 'Integrity', 'Intelligence', 'Jealousy', 'Kindness', 'Loyalty', 'Maturity', 'Patience', 'Perseverance', 'Sanity', 'Self-control', 'Sensitivity', 'Sophistication', 'Stupidity', 'Sympathy', 'Talent', 'Tolerance', 'Trust', 'Warmth', 'Weakness', 'Wisdom', 'Wit']
  var wisdom = start[Math.floor(Math.random() * start.length)] + ' ' + verb[Math.floor(Math.random() * verb.length)] + ' with ' + noun[Math.floor(Math.random() * noun.length)].toLowerCase()
  return wisdom
}

var testPosts = []

for (var i = 0; i < 30; i++) {
  var wisdom = generateWisdom()
  testPosts.push({
    'slug': wisdom.toLowerCase().replace(/\s+/g, '-'),
    'title': wisdom + i,
    'author': ['fakeUser', 'spiffysparrow', 'happyPoster'][Math.floor(Math.random() * 3)],
    'url': '',
    // there are images for all every number, so this will assign a unique consistent image for up to i = 99
    'image': 'https://avatars3.githubusercontent.com/u/27888' + (i + 10),
    'description': faker.lorem.sentence(30),
    'content': '# Example post\n\nThis is a test post\n\n- one\n- two\n\ntest | test2\n---- | -----\ntester | tester2\n\n',
    'date': 'Wed Mar 30 2016 18:51:00 GMT-0700 (PDT)',
    'unix': 1459389060,
    'tags': [
      wisdom.split(' ').pop(),
      'wisdom'
    ],
    'published': i < 25
  })
}

module.exports = testPosts
