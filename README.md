# BrigadeHub
=================

A Work in Progress (WIP, read: unfinished, not-feature-complete, not-production-ready) of a Code for America Brigade Website/Portal CMS. This is being built to consolidate the efforts of maintaining a brigade website into a single location, and to allow other non-developer brigade leadership to update content as needed.

BrigadeHub is designed to meet some very specific goals:

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

Contributing
------------

We're shooting for **MVP** and we need your help! You can take a look through the [issues](https://github.com/sfbrigade/brigadehub/issues) on this repo, and look for any issues tagged ***[`help wanted`](https://github.com/sfbrigade/brigadehub/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+needed%22)***, those are things you can hop in and contribute without much coordination. Other issues are definitely welcome for contributions, but would require more coordination with me to ensure we're using the same data structures moving forward.

To coordinate with the current team or for help in installing/running, join us on [SFBrigade Slack](http://c4a.me/cfsfslack) on the `#brigadehub` channel, or reach out to me on the `#sfbrigade` IRC channel on freenode.

Inspirations
------------

Similar projects have been concieved and implemented previously, most prominently by [CodeForPhilly](https://codeforphilly.org/) in the form of [Laddr](https://github.com/CfABrigadePhiladelphia/laddr). The reason I'm building a parallel system is for a few reasons:

- I wanted a system that isn't based in PHP, and didn't require a custom Linux VM to run
- I wanted to utilize the cross-discipline talents of Node.js developers, who generally can move from front-back end quickly
- I wanted a one-click deploy system, preferrably to Heroku, that would make deployment of a new hub effortless
- I wanted a platform tightly coupled with the Github API, for oauth, handling permissioning and adminning of the github repos easily
- I wanted a system that easily lent itself to additional onboarding steps for new members.

Another project which this is pulling inspiration from is [CodeForAtlanta](http://www.codeforatlanta.org/)'s [Connector](https://github.com/codeforatlanta/connector). [Chime](https://github.com/chimecms/chime) was also a CMS that had similar goals, but focused on local governments, rather than brigades.

Features
--------

- **OAuth 2.0 Authentication** via GitHub (with the possibility of others)
- Flash notifications
- MVC Project Structure
- Sass stylesheets (auto-compiled via middleware)
- Bootstrap 3
- Theming
- **Account Management**
 - Gravatar
 - Profile Details
 - Link multiple OAuth strategies to one account
 - Delete Account
- CSRF protection

Install - Deploy support
------------------------
This is actively maintained in [brigadehub's wiki](https://github.com/sfbrigade/brigadehub/wiki/Install---Support)

Changelog
---------

This can be found on [brigadehub's releases page](https://github.com/sfbrigade/brigadehub/releases)

License
-------

This can be found in [brigadehub's wiki](https://github.com/sfbrigade/brigadehub/wiki/License) as well.
