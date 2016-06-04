var faker = require('faker')

module.exports = [
  {
    'id': 'Test-Empty-Project',
    'brigade': 'codeforexample',
    'status': 'discovery',
    'thumbnailUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bannerUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'type': '',
    'name': 'Test-Empty-Project',
    'description': 'this is an empty repo. WOOO!',
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
    'contact': [],
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
    'content': '# This Project! \n\n This is sub info.\n\n' + faker.lorem.paragraph() + '\n\n' + faker.lorem.paragraph() + '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'really-empty-project',
    'brigade': 'codeforexample',
    'status': 'beta',
    'thumbnailUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bannerUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'type': '',
    'name': 'really-empty-project',
    'description': "this repo doesn't even have a readme! WOOOO!",
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
    'contact': [],
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
    'content': '# This Project! \n\n This is sub info.\n\n' + faker.lorem.paragraph() + '\n\n' + faker.lorem.paragraph() + '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'forked-project-kong',
    'brigade': 'codeforexample',
    'status': 'alpha',
    'thumbnailUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bannerUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'type': '',
    'name': 'forked-project-kong',
    'description': ':monkey: Open-source, Microservice & API Management Layer built on top of NGINX',
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
    'contact': [],
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
    'content': '# This Project! \n\n This is sub info.\n\n' + faker.lorem.paragraph() + '\n\n' + faker.lorem.paragraph() + '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'mirrored-project-hackathon-starter',
    'brigade': 'codeforexample',
    'status': 'live',
    'thumbnailUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bannerUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'type': '',
    'name': 'mirrored-project-hackathon-starter',
    'description': 'A new project.',
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
    'contact': [],
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
    'content': '# This Project! \n\n This is sub info.\n\n' + faker.lorem.paragraph() + '\n\n' + faker.lorem.paragraph() + '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'mirrored-project-mirror',
    'brigade': 'codeforexample',
    'status': 'mvp',
    'thumbnailUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bannerUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'type': '',
    'name': 'mirrored-project-mirror',
    'description': 'A new project.',
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
    'contact': [],
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
    'content': '# This Project! \n\n This is sub info.\n\n' + faker.lorem.paragraph() + '\n\n' + faker.lorem.paragraph() + '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  }, {
    'id': 'mirrored-project-mirror',
    'brigade': 'codeforexample',
    'status': 'proposed',
    'thumbnailUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bannerUrl': 'http://i.imgur.com/MRgvL1K.png',
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'type': '',
    'name': 'mirrored-project-mirror',
    'description': 'A new project.',
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
    'contact': [],
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
    'content': '# This Project! \n\n This is sub info.\n\n' + faker.lorem.paragraph() + '\n\n' + faker.lorem.paragraph() + '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  }
]
