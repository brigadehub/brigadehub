<img src="/assets/rasterized/logo-banner-color-white.png" />

# BrigadeHub

[![Build Status](https://travis-ci.org/sfbrigade/brigadehub.svg?branch=edge)](https://travis-ci.org/sfbrigade/brigadehub)
[![npm](https://img.shields.io/npm/v/brigadehub.svg?maxAge=2592000)](https://www.npmjs.com/package/brigadehub)
[![Slack Status](https://sfbrigade-slackin.herokuapp.com/badge.svg)](https://sfbrigade-slackin.herokuapp.com/)
[![OSS Manifesto](https://img.shields.io/badge/OSS-Manifesto-purple.svg?style=flat)](http://ossmanifesto.org/)
[![Keep A Changelog](https://img.shields.io/badge/Keep%20A-Changelog-blue.svg?style=flat)](http://keepachangelog.com/)
[![JS Standard](https://img.shields.io/badge/JS-Standard-yellow.svg?style=flat)](https://github.com/feross/standard)

### Table of Contents

- [Overview](#simplify-your-brigades-website-maintenence)
- [Inspirations](#inspirations)
- [Installation and Usage](#installation-and-usage)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
- [Testing](#testing)
- [Deploy (not recommended yet)](#deploy)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [Core Contributors](#core-contributors)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

### Simplify your brigade's website maintenence

BrigadeHub is an **alpha** work in progress of a Code for America Brigade website/portal. This is being built to consolidate the efforts of maintaining a brigade website into a single location, and to allow other non-developer brigade leadership to update content as needed.

***brigadehub, while deployed for Code for San Francisco, has not yet been optimized for wide adoption yet. If you deploy this to your production brigade site, you do so at your own risk.***

For a complete top-down view of the roadmap, take a look at our active ***[Roadmap Wiki](https://github.com/sfbrigade/brigadehub/wiki/Roadmap)***

In short, BrigadeHub is designed to meet some very specific goals:

- Be the external face for the brigade
- Show Leadership / Contact info / member bios
- Brigade Blogging
- Show upcoming events and calendars through Meetup and Google Calendar API integration
- Give new users a place to onboard through tight integration with Github oauth and expandable API integrations
- Display and market active projects through Github API integration
- Allow non-developers to update website info at-will
- Allow developers to hack and customize as desired
- Allow brigades to launch with a single non-dev step to their own environment (most likely Heroku)

This project is originally based on [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter), and that's where most of the deploy documents come from, but the codebase has been heavily modified to meet our needs. We're striving to match [feross/standard](https://github.com/feross/standard) javascript styling, though the original boilerplate didn't conform to that, so it's a wip.

Inspirations
------------

Similar projects have been conceived and implemented previously, most prominently by [CodeForPhilly](https://codeforphilly.org/) in the form of [Laddr](https://github.com/CfABrigadePhiladelphia/laddr). The reason we're building a parallel system is for a few reasons:

- a system that isn't based in PHP, and didn't require a custom Linux VM to run
- to utilize the cross-discipline talents of Node.js developers, who generally can move from front-back end quickly
- a one-click deploy system, preferably to Heroku, that would make deployment of a new hub effortless
- a platform tightly coupled with the Github API, for oauth, handling permissioning and adminning of the github repos easily
- a system that easily lent itself to additional onboarding steps for new members.

Another project which this is pulling inspiration from is [CodeForAtlanta](http://www.codeforatlanta.org/)'s [Connector](https://github.com/codeforatlanta/connector). [Chime](https://github.com/chimecms/chime) was also a CMS that had similar goals, but focused on local governments, rather than brigades.

### Installation and usage

There are two methods of install at the moment: via [cloning the source repo](#source) or [docker](#docker). The prerequisites for each change depending on which you choose to use.

<table>
	<tbody>
		<tr>
			<td>
				<a href="#source">
					<img height="125" src="http://i.imgur.com/QBu6ZWo.png" alt="source"/>
				</a>
			</td>
			<td> 
				<a style="padding:30px;display:inline-block" href="#docker">
					<img src="http://i.imgur.com/MM5RT5W.png" height="125" alt="docker"/>
				</a>
			</td>
		</tr>
	</tbody>
<table>

#### Source
##### Prerequisites

- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:**
   - [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9 Mavericks**: `xcode-select --install`)
    - [HomeBrew](http://brew.sh) `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](http://www.visualstudio.com/downloads/download-visual-studio-vs#d-express-windows-8)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`
 - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17">&nbsp;**Fedora**: `sudo dnf groupinstall "Development Tools"`
 - <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17">&nbsp;**OpenSUSE:** `sudo zypper install --type pattern devel_basis`
- [MongoDB](https://www.mongodb.org/downloads)
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** `brew install mongodb`
  - run by typing in `mongod`
  - If you get a permissions error when running, you may need to make additional changes to your system post install:
    - type in `whoami` and note the username of the computer you're working on
    - `sudo mkdir /data /data/db`
    - `sudo chown USERNAME:staff /data /data/db`
    - You should be able to now run `mongod` without a permissions error.
- [Node.js](http://nodejs.org) v4+
  - **Standard Install**
    - Download the binary from the [Node.js website](http://nodejs.org) that corresponds to your system
    - Follow the accompanying installation instructions to install 
  - **via [NVM](https://github.com/creationix/nvm)**
    - *NVM gives you the a few extra nice-to-haves that makes development in Node a lot easier:
      - User Sandboxing
      - No need for `sudo`
      - Ability to run parallel versions of Node separate from each other
    - Uninstall any previously installed Node versions (if you don't already have `nvm` installed)
    - Install NVM using the script found on the [nvm repo](https://github.com/creationix/nvm)), or the following: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash && echo 'export NVM_DIR="$HOME/.nvm"' >> $HOME/.bashrc && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm' >> $HOME/.bashrc && . $HOME/.bashrc && nvm install 6 && nvm alias default 6 && nvm use 6`


**Note:** If you are new to Node or Express, I recommend to watch
[Node.js and Express 101](https://www.youtube.com/watch?v=BN0JlMZCtNU)
screencast by Alex Ford that teaches Node and Express from scratch. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

##### Install (source)

```bash
# Get the latest snapshot
git clone https://github.com/sfbrigade/brigadehub.git

# Change directory
cd brigadehub

# Install NPM dependencies
npm install

# If needed, start mongodb in a separate tab
mongod
```

#### Usage

To run the server in production, run:

```bash
npm start
```

or if starting for local development:

```bash
npm run develop
```

#### Docker

##### Prerequisites

- [Docker Engine](https://docs.docker.com/)
  - or if you're on <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Docker Machine](https://docs.docker.com/)
- A working MongoDB docker container or externally accessible install

##### Install (Docker):

Run the following to retrieve and configure your brigadehub container:

```
docker run -d --name brigadehub \
-p port:5465 \
-e MONGODB=mongourl \
sfbrigade/brigadehub
```

where `port` is the desired external port to access the install (e.g. `80`), and `mongourl` is the externally accessible mongodb instance (e.g. `mongodb://localhost:27017/brigadehub-docker`)

All put together, an example of how it should look:

```
docker run -d --name brigadehub \
-p 80:5465 \
-e MONGODB=mongodb://localhost:27017/brigadehub-docker \
sfbrigade/brigadehub
```

This will download the image and start the instance.

### Testing
#### Linting

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

For details on our linting / js coding style, visit [`feross/standard'](https://github.com/feross/standard). Linting occurs automatically on commit, but you can run it manually by running:

```
npm run lint
```

#### Unit tests

Unit tests are being run via [`tap`](). Any file with the `*.tap.js` naming scheme will be run in unit tests. We are sorely lacking on unit testing, so anyone willing to take these on are very welcome. Unit tests are run automatically on commit, but you can run them manually anytime by running:

```
npm run test:unit
```

To run linting and unit tests together, you can run `npm test`.

#### End to end (e2e) tests

For end-to-end testing, we are using a Selenium standalone server, PhantomJS headless browser, and Nightwatch. Since end to end tests involve testing all aspects of the application, including UI interactions, all three of these services need to be running simultaneously to the development server.

##### Installing Selenium

```
npm run selenium:install
```

##### Runnning e2e tests

When you are ready to run e2e tests, you'll need to run the following commands in separate terminals:

- `npm run selenium:start`
- `npm run develop`
- `npm run test:e2e`

To stop the selenium server after the tests, run `npm run selenium:stop`.

If for some reason, you need to stop the selenium server
```
npm selenium:stop
```

### Deploy

***brigadehub, while deployed for Code for San Francisco, has not yet been optimized for wide adoption yet. If you deploy this to your production brigade site, you do so at your own risk.***

If you are outside Code for San Francisco and you want to get a version of brigadehub up for your brigade, fork sfbrigade/brigadehub into your own brigade's organization. Updates should be done using upstream fetches. Contributing back should be done via Pull Request back to this repository :)

These instructions will be updated as the project emerges from the Alpha-release haze :P

### Troubleshooting

*Using a SCM client with Mac OS*
There are issues, because of the way Mac OS and Node work together, or don't.  (Here's an example of people having problems)[https://github.com/gtramontina/ghooks/issues/40]

The most effective way of solving this, besides learning how to use the git CLI, would be to create an alias in your .bash_profile

Something like this
```
ghdc="open Applications/GitHub\ Desktop.app/Contents/MacOS/GitHub\ Desktop"
```
And instead of opening your client from an alias in applications,
#1. open a terminal, and cd to the sfbrigadehub repo root
#1. cd to the sfbrigadehub repo root
#1. run your alias

### Changelog

To see what has changed in recent versions of brigadehub, see the [CHANGELOG](./.github/CHANGELOG.md).

### Core Contributors

- Trent Oswald - Project Lead - ([@therebelrobot](https://github.com/therebelrobot)) <`trentoswald``@``therebelrobot.com`>
- Aaron Schachter [@aaronschachter](https://github.com/aaronschachter)
- Andrew Bacon [@andrewmbacon](https://github.com/andrewmbacon)
- [@davidcarvel](https://github.com/davidcarvel)
- Deborah [@deborahahn](https://github.com/deborahahn)
- Debbie Espino [@despino](https://github.com/despino)
- Gisela [@GiselaKay](https://github.com/GiselaKay)
- Leo Lau [@hawflau](https://github.com/hawflau)
- Jason Durant [@jaydurant](https://github.com/jaydurant)
- John Naulty Jr. [@jnaulty](https://github.com/jnaulty)
- John Gluck [@johngluck65](https://github.com/johngluck65)
- Jesse Szwedko [@jszwedko Owner](https://github.com/jszwedko Owner)
- Judy5000 [@Judy5000 Owner](https://github.com/Judy5000 Owner)
- Justin [@Juxtaposeidon](https://github.com/Juxtaposeidon)
- kanagha [@kanagha](https://github.com/kanagha)
- Kevin Litchfield [@kevinlitchfield](https://github.com/kevinlitchfield)
- Maja Bogeski [@majabogeski](https://github.com/majabogeski)
- Neri J. Jakubowski Junior [@nerijunior](https://github.com/nerijunior)
- Patrick Connolly [@patcon](https://github.com/patcon)
- Phips Peter [@pspeter3](https://github.com/pspeter3)
- [@rogeliobonilla](https://github.com/rogeliobonilla)
- Tracy [@spiffysparrow](https://github.com/spiffysparrow)
- [@Thithi32](https://github.com/Thithi32)
- Jessica Parsons [@verythorough](https://github.com/verythorough)
- [@whatdoublechen](https://github.com/whatdoublechen)
- [@wrendo](https://github.com/wrendo)

### Resources

*will be adding resources soon*

### Other questions

Feel free to chat with the brigadehub core team (and many other users) on `sfbrigade` Slack in the `#brigadehub` channel ([join here](http://c4sf.me/slack)), on IRC in the [#sfbrigade](irc://irc.freenode.net/sfbrigade) channel on Freenode, or via opening a new Github Issue here in the repo.

## Contributing

Refer to our [`CONTRIBUTING.md`](/.github/CONTRIBUTING.md) doc.

## License

This can be found in [brigadehub's wiki](https://github.com/sfbrigade/brigadehub/wiki/License) as well.
