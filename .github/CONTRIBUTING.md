Contributing
------------

#### Before starting

- Have the application running locally on your machine
- Have [Zenhub](https://www.zenhub.io/) installed in your chrome browser so you can see the boards we are organizing
- Have looked through and understand the [Brigadehub Roadmap](https://github.com/sfbrigade/brigadehub/wiki/Roadmap) and the feature list for the current release push.
- Have joined the SFbrigade Github org ([join by clicking here](http://c4sf.me/joingithub))

#### When you are ready to start

We are currently pushing toward `ALPHA` release.

- Pick from the github issues tagged with `ALPHA`, and in the `Alpha` Zenhub column you feel you can make progress on
- If you are working on a feature that is not currently listed in the GH issues list, make sure it falls within the alpha list at [#51](https://github.com/sfbrigade/brigadehub/issues/51), and check with @therebelrobot to see if it's already there, if not, open an issue for it before beginning work.
- When you begin working on a feature, assign the issue to yourself so others know you are owning it.
- Any features you want to work on should be done in a `feature/<feature-name>` branch, branched from the `edge` branch
- when ready to merge in, a PR should be opened from that branch into `edge`
- You should be regularly `git merge edge`ing while you're working, so you have an up-to-date version you're working on. 
- Any merge conflicts are primarily the responsibility of the PR opener to resolve. 
- We should be focusing on small 1 hour sprints for merging, so focus your work on what you can accomplish in the next hour. We should be checking in our code after every hour, even if incomplete. I (@therebelrobot) will be managing reviewing / merging the PRs, and will be updating edge with the new code as the day goes on.

#### When you are finished

- open a final PR to `edge`, indicating that it delivers the individual issue you have been working on
- let @therebelrobot know to review it, or tag him in the PR
- grab a drink of water, take a small break, and jump back in the issue list


To coordinate with the current team or for help in installing/running, join us on [SFBrigade Slack](http://c4a.me/cfsfslack) on the `#brigadehub` channel, or reach out to me on the `#sfbrigade` IRC channel on freenode.

## Contribution Guidelines

If something is unclear, confusing, or needs to be refactored, please let me know.
Pull requests are always welcome, however, please open an issue before
submitting a pull request. This project uses
[feross/standard](https://github.com/feross/standard) with a
few minor exceptions. If you are submitting a pull request that involves
Jade templates, please make sure you are using *spaces*, not tabs. Please also ensure
your styling matches the `.csscomb.json` file included with the project.
