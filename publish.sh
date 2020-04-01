#!/bin/bash

set -ex

npm run build
mkdir -p out
mv index.html out
cd out
git init
cp ../.git/config .git/
git add index.html
git commit -m 'Build'
git push --force origin master:gh-pages
