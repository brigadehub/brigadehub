FROM node:6-onbuild
MAINTAINER Trent Oswald (@therebelrobot) <trentoswald@therebelrobot.com>
RUN npm install --production

EXPOSE 5465

ENV MONGODB mongodb://localhost:27017/brigadehub-docker

ENV GITHUB_ID be1b409d62f41a56684c
ENV GITHUB_SECRET 15b3e064eb512ed185f4e9a40e38cba5f1db594d

CMD ["npm", "start"]
