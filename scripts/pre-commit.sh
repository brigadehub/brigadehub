#! /bin/sh

exec git stash -q --keep-index
exec npm test
exec git stash pop -q
