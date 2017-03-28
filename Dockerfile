FROM mhart/alpine-node:6

MAINTAINER Oz Haven (@therebelrobot) <dockerhub@therebelrobot.com>

# make is needed for running docker locally
RUN apk update && apk add --no-cache make python g++

COPY ./ ./suite
WORKDIR ./suite

# More deps for working locally
RUN npm prune --production
RUN npm rebuild --production
RUN npm install

EXPOSE 5555

ENV PORT 5555
ENV NODE_ENV production

CMD ["make", "start"]
