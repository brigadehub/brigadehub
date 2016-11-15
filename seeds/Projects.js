var faker = require('faker')

module.exports = [
  {
    'id': 'Test-Empty-Project',
    'brigade': 'codeforexample',
    'status': 'discovery',
    'active': false,
    'thumbnailUrl': faker.image.city(360, 360, false),
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'Test-Empty-Project',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'homepage': 'https://github.com/codeforexample/Test-Empty-Project',
    'repository': 'https://github.com/codeforexample/Test-Empty-Project',
    'links': [],
    'videos': [],
    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'partners': [],
    'team': [
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }
    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'really-empty-project',
    'brigade': 'codeforexample',
    'status': 'beta',
    'active': false,
    'thumbnailUrl': faker.image.city(360, 360, false),
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'really-empty-project',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'homepage': 'https://github.com/codeforexample/really-empty-project',
    'repository': 'https://github.com/codeforexample/really-empty-project',
    'links': [],
    'videos': [],
    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'partners': [],
    'team': [
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }
    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'forked-project-kong',
    'brigade': 'codeforexample',
    'status': 'alpha',
    'active': false,
    'thumbnailUrl': faker.image.city(360, 360, false),
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'forked-project-kong',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'homepage': 'https://getkong.org/install',
    'repository': 'https://github.com/codeforexample/forked-project-kong',
    'links': [],
    'videos': [],
    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'partners': [],
    'team': [
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'mirrored-project-hackathon-starter',
    'brigade': 'codeforexample',
    'status': 'live',
    'active': true,
    'thumbnailUrl': faker.image.city(360, 360, false),
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'mirrored-project-hackathon-starter',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'homepage': 'https://github.com/codeforexample/mirrored-project-hackathon-starter',
    'repository': 'https://github.com/codeforexample/mirrored-project-hackathon-starter',
    'links': [],
    'videos': [],
    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'partners': [],
    'team': [
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'mirrored-project-mirror',
    'brigade': 'codeforexample',
    'status': 'mvp',
    'active': true,
    'thumbnailUrl': faker.image.city(360, 360, false),
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'mirrored-project-mirror',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'homepage': 'https://github.com/codeforexample/mirrored-project-mirror',
    'repository': 'https://github.com/codeforexample/mirrored-project-mirror',
    'links': [],
    'videos': [],
    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'partners': [],
    'team': [
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  }, {
    'id': 'mirrored-project-mirror',
    'brigade': 'codeforexample',
    'status': 'proposed',
    'active': false,
    'thumbnailUrl': faker.image.city(360, 360, false),
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'mirrored-project-mirror',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'homepage': 'https://github.com/codeforexample/mirrored-project-mirror',
    'repository': 'https://github.com/codeforexample/mirrored-project-mirror',
    'links': [],
    'videos': [],
    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'partners': [],
    'team': [
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  }
]
