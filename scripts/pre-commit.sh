#! /usr/bin/env sh

git stash -q --keep-index
npm test
git stash pop -q
