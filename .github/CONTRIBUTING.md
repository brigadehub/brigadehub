Contributing
------------

#### Before starting

- Have the application [installed](https://github.com/sfbrigade/brigadehub/wiki/Development-Install) and running locally on your machine
- Have [Zenhub](https://www.zenhub.io/) installed in your chrome browser so you can see both the Epics and the Boards we are using
- Have looked through and understand the [Brigadehub Roadmap](https://github.com/sfbrigade/brigadehub/wiki/Roadmap) and the feature list for the current release push.
- Have joined the SFbrigade Github org ([join by clicking here](http://c4sf.me/joingithub))

#### When you are ready to start

This application has a lot of moving parts, and we're working hard to make sure those parts are fitting together nicely. In whole, the Alpha version of brigadehub that we're shooting for has 7 main parts:

- Landing page
- Events list
- Projects list
- Individual Project Profiles
- Blog list
- Individual Blog Posts
- Contact/About

If you would like to work on any of those pages in specific, here's how to find more info about them. Each page has its own "Epic", which is named `Epic: <page name>`. These parent issues contain a list of all the sub-tasks associated with that page, and should be used for tracking the progress of the page itself. You can find all the Epics by searching for the [![Epic](https://i.imgur.com/C6nXEEd.png)](https://github.com/sfbrigade/brigadehub/labels/Epic) tag. The rest of the parent pages/associated tags are listed below:

##### Landing Page
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public Landing page | `/` | [#54 Epic: Landing page (public page)](https://github.com/sfbrigade/brigadehub/issues/54) | [![](https://i.imgur.com/qWOwkx4.png)](https://github.com/sfbrigade/brigadehub/issues?q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Landing+%2F+Home%22)
Editing Landing page | TBD | [#136 Epic: Landing page (management)](https://github.com/sfbrigade/brigadehub/issues/136) | [![](https://i.imgur.com/AP2i5CB.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Landing+%2F+Home%22+label%3ACMS)

##### Events List
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public Events Page | `/events` | [#56  Epic: Events list (public page)](https://github.com/sfbrigade/brigadehub/issues/56 ) | [![](https://i.imgur.com/MHAEym4.png)](https://github.com/sfbrigade/brigadehub/issues?q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Event+List%22)
Manage Events Page | `/events/manage` | [#127 Epic: Events list (management)](https://github.com/sfbrigade/brigadehub/issues/127) | [![](https://i.imgur.com/Q0OVNcG.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Event+List%22+label%3ACMS)

##### Projects List
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public Projects List | `/projects` | [#128 Epic: Projects List (public)](https://github.com/sfbrigade/brigadehub/issues/128) | [![](https://i.imgur.com/y5mZmWO.png)](https://github.com/sfbrigade/brigadehub/labels/Page%3A%20Project%20List)
Manage Projects List | `/projects/manage` | [#110 Epic: Projects List (management)](https://github.com/sfbrigade/brigadehub/issues/110) | [![](https://i.imgur.com/W6RlXX4.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aopen+label%3A%22Page%3A+Project+List%22+label%3ACMS)

##### Individual Project Profile
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public Project Profile | `/projects/:projectId` | [#132 Epic: Individual Project (public page)](https://github.com/sfbrigade/brigadehub/issues/132) | [![](https://i.imgur.com/VYSocLv.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Individual+Project%22+)
Edit Project Profile | `/projects/:projectId/settings` and `/projects/new`| [#134 Epic: Individual Project (management)](https://github.com/sfbrigade/brigadehub/issues/134) | [![](https://i.imgur.com/vNhLIRh.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Individual+Project%22+label%3ACMS)

##### Blog list
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public blog list | `/blog` | [#113 Epic: Blog list (public page)](https://github.com/sfbrigade/brigadehub/issues/113) | [![](https://i.imgur.com/3Rh4SVQ.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Blog+List%22+)
Manage blog list | `/blog` | [#115 Epic: Blog List (management)](https://github.com/sfbrigade/brigadehub/issues/115) | [![](https://i.imgur.com/Kid1lWq.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Blog+List%22+label%3ACMS)

##### Individual Blog Post
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public Blog Post | `/blog/:blogId` | [#122 Epic: Individual Blog Post (public page)](https://github.com/sfbrigade/brigadehub/issues/122) | [![](https://i.imgur.com/nZtxjFE.png0)](https://github.com/sfbrigade/brigadehub/issues?q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Individual+Blog+Post%22)
Edit Blog Post | `/blog/:blogId/edit` and `/blog/new` | [#89  Epic: Individual Blog Post (management)](https://github.com/sfbrigade/brigadehub/issues/89 ) | [![](https://i.imgur.com/LZ3pYLS.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+Individual+Blog+Post%22++label%3ACMS)

##### Contact / About Page
Type | App Route | Parent Issue | Tag
---- | --------- | ------------ | ---
Public About / Contact page | `/contact` | [#55  Epic: Contact/About (public page)](https://github.com/sfbrigade/brigadehub/issues/55) | [![](https://i.imgur.com/pUOfeDf.png)](https://github.com/sfbrigade/brigadehub/issues?q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+About+%2F+Contact%22)
Edit About / Contact page | `/contact/edit` | [#138 Epic: Contact/About (management)](https://github.com/sfbrigade/brigadehub/issues/138) | [![](https://i.imgur.com/jlup9Q6.png)](https://github.com/sfbrigade/brigadehub/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Page%3A+About+%2F+Contact%22+label%3ACMS)


- If an issue is already assigned to someone, please make sure to check in with them either on slack or here on github before working on that, so as to prevent duplication of efforts.
- If you are working on a feature that is not currently listed in the GH issues list, make sure it falls within the alpha list at [#51](https://github.com/sfbrigade/brigadehub/issues/51), or check with @therebelrobot to see if it's already there. If not, open an issue for it before beginning work.
- When you begin working on a feature, assign the issue to yourself so others know you are working on it.
- Any features you want to work on should be done in a `feature/<feature-name>` branch, branched from the `edge` branch, where `<feature-name>` is a short description of the change (perhaps the issue title).


#### When you are finished

- Make sure to run `npm test` locally, and resolve any linting issues that may be present.
- when ready to merge in, a PR should be opened from that branch into `edge`. This PR needs to be reviewed by at least 1 other person ***DO NOT MERGE YOUR OWN PRs***
- You should be regularly `git merge edge`ing while you're working, so you have an up-to-date version you're working on. 
- Any merge conflicts are primarily the responsibility of the PR opener to resolve. 
- If what you are working on includes layout / styling changes, please include screenshots of the changes made (if you're on Mac, try using [Mac2Imgur](https://github.com/mileswd/mac2imgur). It's pretty rad.)

To coordinate with the current team or for help in installing/running, join us on [SFBrigade Slack](http://c4a.me/cfsfslack) on the `#brigadehub` channel, or reach out to me on the `#sfbrigade` IRC channel on freenode.

## Contribution Guidelines

If something is unclear, confusing, or needs to be refactored, please let me know.
Pull requests are always welcome, however, please open an issue before
submitting a pull request. This project uses
[feross/standard](https://github.com/feross/standard) with a
few minor exceptions. If you are submitting a pull request that involves
Jade templates, please make sure you are using *spaces*, not tabs. Please also ensure
your styling matches the `.csscomb.json` file included with the project.
