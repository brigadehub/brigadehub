var faker = require('faker')

module.exports = [
  {
    'slug': 'test-post',
    'title': 'Test Post',
    'author': 'therebelrobot',
    'url': '',
    'image': faker.image.city(1080, 600),
    'description': faker.lorem.sentence(30),
    'content': '# Example post\n\nThis is a test post\n\n- one\n- two\n\ntest | test2\n---- | -----\ntester | tester2\n\n',
    'date': 'Wed Mar 30 2016 18:51:00 GMT-0700 (PDT)',
    'unix': 1459389060,
    'tags': [
      'test tag',
      'test tag 2'
    ]
  },
  {
    'slug': 'test-post-2',
    'title': 'Test Post 2',
    'author': 'andrewmbacon',
    'url': '',
    'image': faker.image.people(1080, 600),
    'content': '# Example post 2\n\nThis is a test post\n\n- one\n- two\n\ntest | test2\n---- | -----\ntester | tester2\n\n',
    'description': faker.lorem.sentence(30),
    'date': 'Wed Mar 30 2016 18:51:00 GMT-0700 (PDT)',
    'unix': 1459389060,
    'tags': [
      'test tag 4',
      'test tag 2'
    ]
  },
  {
    'slug': 'external-post-3',
    'title': 'External Post 3',
    'author': 'spiffysparrow',
    'url': faker.internet.url(),
    'image': faker.image.technics(1080, 600),
    'content': '# Example post 3\n\nThis is a test post\n\n- one\n- two\n\ntest | test2\n---- | -----\ntester | tester2\n\n',
    'description': faker.lorem.sentence(30),
    'date': 'Wed Mar 30 2016 18:51:00 GMT-0700 (PDT)',
    'unix': 1459389060,
    'tags': [
      'test tag 3',
      'test tag 4',
      'external'
    ]
  }
]
