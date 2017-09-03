<img src="https://cdn.rawgit.com/brigadehub/brigadehub/master/assets/rasterized/logo-banner-color-white.png" alt="Brigadehub"/>

---

[![Greenkeeper badge](https://badges.greenkeeper.io/brigadehub/brigadehub.svg)](https://greenkeeper.io/)

[![TrustOSS Compliant](http://trustoss.org/badge_version.svg)](http://trustoss.org)
[![Build Status](https://travis-ci.org/brigadehub/brigadehub.svg?branch=edge)](https://travis-ci.org/brigadehub/brigadehub)
[![npm](https://img.shields.io/npm/v/brigadehub.svg?maxAge=2592000)](https://www.npmjs.com/package/brigadehub)
[![Gitter](https://img.shields.io/gitter/room/brigadehub/Lobby.svg)](https://gitter.im/brigadehub/Lobby)
[![IRC](https://camo.githubusercontent.com/2fecf7a682dcdd4c2be514294ef18a6ef5773942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636861742d6f6e2532304952432d677265656e2e737667)](http://webchat.freenode.net/?channels=#brigadehub)
[![Keep A Changelog](https://img.shields.io/badge/Keep%20A-Changelog-blue.svg?style=flat)](http://keepachangelog.com/)
[![JS Standard](https://img.shields.io/badge/JS-Standard-yellow.svg?style=flat)](https://github.com/feross/standard)

### Table of Contents

- [In a Nutshell](#in-a-nutshell)
- [Ways to Use](#ways-to-use)
  - [Suite](#suite)
    - [Production Install](#production-installation)
    - [Development Install](#development-installation)
  - [Admin Gateway](#admin-gateway)
    - [Production Install](#production-installation)
    - [Development Install](#development-installation)
  - [Mini](#mini)
    - [Production Install](#production-installation)
    - [Development Install](#development-installation)
- [Usage](#usage)
  - [Core API](#core-api)
  - [Admin Theme](#admin-theme)
  - [Public Theme](#public-theme)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Contributors](#contributors)
- [Inspirations](#inspirations)
- [Additional Resources](#resources)
- [License](#license)

### In a nutshell

BrigadeHub is an **beta** stage data portal for volunteer coding organizations. While being built for Code for America Brigades, it can be be used for any project-based coding organization. It's being built to consolidate the efforts of maintaining a brigade's information into a single location, to distribute the task of content creation across the various non-technical brigade roles, and to enhance the experience of both members and admins of these unique organizations.

For a complete top-down view of the roadmap, take a look at our active ***[Roadmap Wiki](https://github.com/brigadehub/brigadehub/wiki/Roadmap)*** (currently being worked on).

In short, BrigadeHub is designed to meet some very specific goals:

- Provide out-of-the-box utilities for organization admins:
  - Public facing website, with contact page, blog, project profiles and more
  - Admin dashboard
  - Robust content management permissioning and distribution
- Be easy to install and upkeep. You shouldn't have to dedicate a team just for your website anymore, nor should you need to know how to code to update your site.
- Be modular, extensible, and hackable. Brigadehub Core provides a simple REST API for minimal deployment if you already have your infrastructure in place.
- Allow brigades to communicate with each other quickly and effectively

### Ways to use

There are three different ways of interacting with/using Brigadehub:

- **Suite**: out of the box solution, best if you have no current site solution and don't want to deal with any coding. Swap out themes as you like with community-built solutions.
- **Admin Gateway**: Minimal API with a GUI admin gateway, best if you already have a website and want a way of dynamically generating the content of it. You'll need to read up on the Core API to tie it into your frontend, but once deployed, the data can be maintained by non-coders.
- **Mini**: This is just a REST API interface. Best if you already have an interface built out and just want to leverage the dataset of Brigadehub.

Depending on the needs of your organization, you'll want to decide which will work best for you.

*Note: Unless otherwise specified, links like `location.of.mongo` and `path/to/file` do not represent the actual link you need to use in your enviroment, and should be replaced with the appropriate locations.*

#### Suite

**Brigadehub Suite** is the flagship install of Brigadehub, and is more or less a ***brigade-in-a-box***. It installs three components: **Core**, **Admin Theme**, and **Public Theme**. It's deployed in such a way that you should never *need* to touch the code, but if you *want* to, it's a simple matter. It provides Admin tools to manage your brigade information, and a slick frontend to display the info you're managing. Your frontend developers can dynamically pull the data about your brigade via the Core API if they have external tools that need the same data. And you can rest assured that we'll be working on patches and updates over time to make this the most secure and stable platform ever.

###### Production Install

<details><summary><img src="http://saasiter.com/img/services/heroku.png" height="25" /> Heroku (click to open)</summary><p>
Heroku sports this handy one-click-install feature, which will handle most of the configuration for you. Base the install off [brigadehub/brigadehub](https://github.com/brigadehub/brigadehub), and you're good to go (the button below does that ⬇)

[![Brigadehub Suite Heroku Install](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fbrigadehub%2Fbrigadehub%2Ftree%2Fmaster)

</p></details><br/>

<details><summary><img src="https://pbs.twimg.com/profile_images/378800000124779041/fbbb494a7eef5f9278c6967b6072ca3e_normal.png" height="25" /> Docker (click to open)</summary><p>
***Pre-requisites***

- [Docker Engine](https://docs.docker.com/engine/installation/)
- A running mongo instance, via docker or otherwise

***Installation and Running***

```bash
docker pull brigadehub/suite
docker run -d --expose=8080:desiredport -e MONGODB='mongodb://location.of.mongo:27017/brigadehub-suite' -e PORT=desiredport brigadehub/suite
```

</p></details><br/>

<details><summary><img src="https://www.npmjs.com/static/images/touch-icons/favicon-32x32.png" height="25" /> NPM CLI (click to open)</summary><p>
***Pre-requisites***

- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***
```bash
yarn global add brigadehub
PORT=desiredport MONGODB_URI=mongodb://location.of.mongo:27017/brigadehub-suite brigadehub-suite
```
</p></details><br/>

<details><summary><img src="http://lepbase.org/wp-content/themes/lepbase-dot-org/images/code-icon.png" height="25" /> Source (click to open)</summary><p>
***Pre-requisites***

- Git
- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***
```bash
git clone https://github.com/brigadehub/brigadehub
cd brigadehub
make install
make start
```
</p></details>

###### Development Install

<details><summary><img src="http://lepbase.org/wp-content/themes/lepbase-dot-org/images/code-icon.png" height="25" /> Source (click to open)</summary><p>
To work on Brigadehub Suite as a developer, you need to clone and link internally all four portions of the suite. Fork all 4 repos into your desired organization or account, and work from those, making sure to update from upstream periodically.

***Pre-requisites***

- Git
- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***

First, clone the following repositories into your own account, either your organization's org or your personal account:

- [brigadehub/brigadehub](https://github.com/brigadehub/brigadehub)
- [brigadehub/core](https://github.com/brigadehub/core)
- [brigadehub/theme-public-c4sf](https://github.com/brigadehub/theme-public-c4sf)
- [brigadehub/theme-admin-c4sf](https://github.com/brigadehub/theme-admin-c4sf)

Once you've forked all four, clone the repos locally (replacing `your-account` with the appropriate org/account name):

```bash
git clone https://github.com/your-account/brigadehub
git clone https://github.com/your-account/core
git clone https://github.com/your-account/theme-public-c4sf
git clone https://github.com/your-account/theme-admin-c4sf
```

In separate terminals, run the following:

```bash
cd theme-public-c4sf
make upstream/set
make install
make link
```

```bash
cd theme-admin-c4sf
make upstream/set
make install
make link
```

```bash
cd core
make upstream/set
make install
make link
```

```bash
cd brigadehub
make upstream/set
make install
make link
make start/develop
```

Any changes made in core, theme-public-c4sf, and theme-admin-c4sf will restart the server in brigadehub, and allow you to preview the changes. When you're done with your changes, make sure the tests pass via `make test`, and create a pull request from the appropriate repo.

***Sync Changes with Upstream***

To pull the most recent changes from `upstream/master`, run the following command:

```
make upstream/sync
```

This will fetch the upstream `master` branch and merge those changes into your local `master` branch.

***Push Changes Upstream***

To push your development changes back to the main brigadehub repo, push your changes up to your branch, and make a Pull Request into the upstream repository's `master` branch. Please include the following information in your pull request:

- A description of the problem you are addressing (or feature being added)
- A link to the related Github Issue (if applicable)
- If making changes to UI, screenshots of the changes presented
- List any deprecations that may be presented
- If you are a new contributor, your name, github handle, and (optionally) website for the maintainers list

Please keep in mind that application changes are subject to review and revision, and may be rejected at the project maintainers discretion.

</p></details>

#### Admin Gateway

**Brigadehub Admin Gateway** installs two components: **Core** and **Admin Theme**. Your frontend developers can dynamically pull the data about your brigade via the Core API, but you as an administrator should never need to touch the code. This is a good option if you already have a site and want to augment it with brigadehub data.

###### Production Install

<details><summary><img src="http://saasiter.com/img/services/heroku.png" height="25" /> Heroku (click to open)</summary><p>
Heroku sports this handy one-click-install feature, which will handle most of the configuration for you. Base the install off [brigadehub/admin-gateway](https://github.com/brigadehub/admin-gateway), and you're good to go (the button below does that ⬇)

[![Brigadehub Admin Gateway Heroku Install](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fbrigadehub%2Fadmin-gateway%2Ftree%2Fmaster)
</p></details><br/>

<details><summary><img src="https://pbs.twimg.com/profile_images/378800000124779041/fbbb494a7eef5f9278c6967b6072ca3e_normal.png" height="25" /> Docker (click to open)</summary><p>
***Pre-requisites***

- [Docker Engine](https://docs.docker.com/engine/installation/)
- A running mongo instance, via docker or otherwise

***Installation and Running***

```bash
docker pull brigadehub/admin-gateway
docker run -d --expose=8080:desiredport -e MONGODB='mongodb://location.of.mongo:27017/brigadehub-admin-gateway' -e PORT=desiredport brigadehub/admin-gateway
```

</p></details><br/>

<details><summary><img src="https://www.npmjs.com/static/images/touch-icons/favicon-32x32.png" height="25" /> NPM CLI (click to open)</summary><p>
***Pre-requisites***

- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***
```bash
yarn global add brigadehub-admin-gateway
brigadehub-admin-gateway --port desiredport --mongodb mongodb://location.of.mongo:27017/brigadehub-admin-gateway
```
</p></details><br/>

<details><summary><img src="http://lepbase.org/wp-content/themes/lepbase-dot-org/images/code-icon.png" height="25" /> Source (click to open)</summary><p>
***Pre-requisites***

- Git
- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***
```bash
git clone https://github.com/brigadehub/admin-gateway
cd admin-gateway
make install
make start
```
</p></details>

###### Development Install

<details><summary><img src="http://lepbase.org/wp-content/themes/lepbase-dot-org/images/code-icon.png" height="25" /> Source (click to open)</summary><p>
To work on Brigadehub Admin Gateway as a developer, you need to clone and link internally all three portions of the install. Fork all 3 repos into your desired organization or account, and work from those, making sure to update from upstream periodically.

***Pre-requisites***

- Git
- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***

First, clone the following repositories into your own account, either your organization's org or your personal account:

- [brigadehub/admin-gateway](https://github.com/brigadehub/admin-gateway)
- [brigadehub/core](https://github.com/brigadehub/core)
- [brigadehub/theme-admin-c4sf](https://github.com/brigadehub/theme-admin-c4sf)

Once you've forked all three, clone the repos locally (replacing `your-account` with the appropriate org/account name):

```bash
git clone https://github.com/your-account/admin-gateway
git clone https://github.com/your-account/core
git clone https://github.com/your-account/theme-admin-c4sf
```

In separate terminals, run the following:

```bash
cd theme-admin-c4sf
make upstream/set
make install
make link
```

```bash
cd core
make upstream/set
make install
make link
```

```bash
cd admin-gateway
make upstream/set
make install
make link
make start/develop
```

Any changes made in core and theme-admin-c4sf will restart the server in admin-gateway, and allow you to preview the changes. When you're done with your changes, make sure the tests pass via `make test`, and create a pull request from the appropriate repo.

***Sync Changes with Upstream***

To pull the most recent changes from `upstream/master`, run the following command:

```
make upstream/sync
```

This will fetch the upstream `master` branch and merge those changes into your local `master` branch.

***Push Changes Upstream***

To push your development changes back to the main brigadehub repo, push your changes up to your branch, and make a Pull Request into the upstream repository's `master` branch. Please include the following information in your pull request:

- A description of the problem you are addressing (or feature being added)
- A link to the related Github Issue (if applicable)
- If making changes to UI, screenshots of the changes presented
- List any deprecations that may be presented
- If you are a new contributor, your name, github handle, and (optionally) website for the maintainers list

Please keep in mind that application changes are subject to review and revision, and may be rejected at the project maintainers discretion.


</p></details>

#### Mini

**Brigadehub Mini** installs only one component: **Core**. No Frontends will be deployed with this install, exposing only the authentication routes and REST APIs. This is an advanced setting, and should be only done if you already have a site and admin portal to manage on your own. All features are accessible via REST API (GraphQL to come soon)

###### Production Install

<details><summary><img src="http://saasiter.com/img/services/heroku.png" height="25" /> Heroku (click to open)</summary><p>
Heroku sports this handy one-click-install feature, which will handle most of the configuration for you. Base the install off [brigadehub/mini](https://github.com/brigadehub/mini), and you're good to go (the button below does that ⬇)

[![Brigadehub Admin Gateway Heroku Install](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fbrigadehub%2Fmini%2Ftree%2Fmaster)
</p></details><br/>

<details><summary><img src="https://pbs.twimg.com/profile_images/378800000124779041/fbbb494a7eef5f9278c6967b6072ca3e_normal.png" height="25" /> Docker (click to open)</summary><p>
***Pre-requisites***

- [Docker Engine](https://docs.docker.com/engine/installation/)
- A running mongo instance, via docker or otherwise

***Installation and Running***

```bash
docker pull brigadehub/mini
docker run -d --expose=8080:desiredport -e MONGODB='mongodb://location.of.mongo:27017/brigadehub-mini' -e PORT=desiredport brigadehub/mini
```
</p></details><br/>

<details><summary><img src="https://www.npmjs.com/static/images/touch-icons/favicon-32x32.png" height="25" /> NPM CLI (click to open)</summary><p>
***Pre-requisites***

- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***
```bash
yarn global add brigadehub-mini
brigadehub-mini --port desiredport --mongodb mongodb://location.of.mongo:27017/brigadehub-mini
```
</p></details><br/>

<details><summary><img src="http://lepbase.org/wp-content/themes/lepbase-dot-org/images/code-icon.png" height="25" /> Source (click to open)</summary><p>
***Pre-requisites***

- Git
- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***
```bash
git clone https://github.com/brigadehub/mini
cd mini
make install
make start
```
</p></details>

###### Development Install

<details><summary><img src="http://lepbase.org/wp-content/themes/lepbase-dot-org/images/code-icon.png" height="25" /> Source (click to open)</summary><p>
To work on Brigadehub Mini as a developer, you need to clone and link internally both portions of the install. Fork both repos into your desired organization or account, and work from those, making sure to update from upstream periodically.

***Pre-requisites***

- Git
- [Node 6.x](https://nodejs.org/en/)
- A running mongo instance
- [Yarn](https://yarnpkg.com/en/) - For installation and package management (replaces NPM in this project)

***Installation and Running***

First, clone the following repositories into your own account, either your organization's org or your personal account:

- [brigadehub/mini](https://github.com/brigadehub/mini)
- [brigadehub/core](https://github.com/brigadehub/core)

Once you've forked both repos, clone the repos locally (replacing `your-account` with the appropriate org/account name):

```bash
git clone https://github.com/your-account/mini
git clone https://github.com/your-account/theme-admin-c4sf
```

In separate terminals, run the following:

```bash
cd core
make upstream/set
make install
make link
```

```bash
cd mini
make upstream/set
make install
make link
make start/develop
```

Any changes made in core and theme-admin-c4sf will restart the server in mini, and allow you to preview the changes. When you're done with your changes, make sure the tests pass via `make test`, and create a pull request from the appropriate repo.


***Sync Changes with Upstream***

To pull the most recent changes from `upstream/master`, run the following command:

```
make upstream/sync
```

This will fetch the upstream `master` branch and merge those changes into your local `master` branch.

***Push Changes Upstream***

To push your development changes back to the main brigadehub repo, push your changes up to your branch, and make a Pull Request into the upstream repository's `master` branch. Please include the following information in your pull request:

- A description of the problem you are addressing (or feature being added)
- A link to the related Github Issue (if applicable)
- If making changes to UI, screenshots of the changes presented
- List any deprecations that may be presented
- If you are a new contributor, your name, github handle, and (optionally) website for the maintainers list

Please keep in mind that application changes are subject to review and revision, and may be rejected at the project maintainers discretion.


</p></details>

#### [Usage](#usage)
##### [Core API](#core-api)
*Core API Documentation can be found on [gitbook](https://brigadehub.gitbooks.io/core-api/)
##### [Admin Theme](#admin-theme)
*Admin Theme Documentation is being worked on*
##### [Public Theme](#public-theme)
*Public Theme Documentation is being worked on*
#### [Troubleshooting](#troubleshooting)
*If you come upon issues while installing or using Brigadehub (any install), open an issue here in Github. If it occurs enough times, it'll make it here into Troubleshooting*
#### [Contributing](#contributing)

Brigadehub works from a fork/PR methodology. If you would like to contribute, check the github issues and see if someone is working on the issue already. If not, comment in the issue that you are working on it (or create a new issue if it's not already there), then fork the repo and submit a PR when your work is complete. Claimed issues without update on the issue itself or via linked PR after 30 days will be unassigned and reopened for others to work on.

#### [Changelog](#changelog)
The changelog for Brigadehub (and each of its components) resides in the appropriate repos ***Releases*** tab.

#### [Contributors](#contributors)

Brigadehub is a Code for San Francisco Infrastructure project, and has been brought about by the generous work of the following individuals. If you make a contribution to Brigadehub (e.g. when opening a PR), feel free to add yourself to this list in addition to your changes. If you are contributing in a non-code fashion, open an issue to have your name added.

##### Current Contributors

- Oz Haven - Project Lead - ([@therebelrobot](https://github.com/therebelrobot)) <`github``@``therebelrobot.com`>
- Bas Sondag - [@BasSondag](https://github.com/BasSondag)
- Perry Taylor - [@pltaylor](https://github.com/pltaylor)

##### Pre-Beta Contributors

- Todd Seller - Project Co-Lead - [@toddseller](https://github.com/toddseller)
- David Hincapie [@davidhincapie](https://github.com/davidhincapie)
- John Gluck [@johngluck65](https://github.com/johngluck65)

##### Pre-Alpha Contributors

- Aaron Schachter [@aaronschachter](https://github.com/aaronschachter)
- Andrew Bacon [@andrewmbacon](https://github.com/andrewmbacon)
- David Carvel [@davidcarvel](https://github.com/davidcarvel)
- Deborah [@deborahahn](https://github.com/deborahahn)
- Debbie Espino [@despino](https://github.com/despino)
- Gisela [@GiselaKay](https://github.com/GiselaKay)
- Leo Lau [@hawflau](https://github.com/hawflau)
- Jason Durant [@jaydurant](https://github.com/jaydurant)
- John Naulty Jr. [@jnaulty](https://github.com/jnaulty)
- Jesse Szwedko [@jszwedko Owner](https://github.com/jszwedko Owner)
- Jessica Parsons [@verythorough](https://github.com/verythorough)
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
- [@whatdoublechen](https://github.com/whatdoublechen)
- [@wrendo](https://github.com/wrendo)

#### Inspirations

Similar projects have been conceived and implemented previously ([Laddr](https://github.com/CfABrigadePhiladelphia/laddr), [Connector](https://github.com/codeforatlanta/connector), [Chime](https://github.com/chimecms/chime ), etc.), but for one reason or another didn't meet the needs of Code for San Francisco and many other brigades. Brigadehub hopes to bridge those infrastructure gaps.

#### [Additional Resources](#resources)

Have additional resources that could benefit those using Brigadehub? Open a Github Issue and let us know!

#### [License](#license)

[MIT](https://tldrlegal.com/license/mit-license)

The MIT License (MIT)

Copyright (c) 2016-2017 Code for San Francisco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
