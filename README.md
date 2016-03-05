# BrigadeHub [![Build Status](https://travis-ci.org/sfbrigade/brigadehub.svg?branch=edge)](https://travis-ci.org/sfbrigade/brigadehub)
#### Simplify your brigade's website maintenence

BrigadeHub is a **pre-alpha** work in progress (read: unfinished, not-feature-complete, not-production-ready) of a Code for America Brigade website/portal CMS/CRM/BLT/BYOB/ETC. This is being built to consolidate the efforts of maintaining a brigade website into a single location, and to allow other non-developer brigade leadership to update content as needed.

For a complete top-down view of the roadmap, take a look at our active ***[Roadmap Discussion](https://github.com/sfbrigade/brigadehub/issues/45)***

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

Contributing
------------

Refer to our [`CONTRIBUTING.md`](/.github/CONTRIBUTING.md) doc.

Changelog
---------

This can be found on [brigadehub's releases page](https://github.com/sfbrigade/brigadehub/releases)

License
-------

This can be found in [brigadehub's wiki](https://github.com/sfbrigade/brigadehub/wiki/License) as well.
