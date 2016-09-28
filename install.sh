#!/bin/bash

# Uninstall stale modules if needed
# rm -rf node_modules

# Install dependencies
npm install

# Setup environment 
mkdir ${PWD}/bin ${PWD}/images
ln -s ${PWD}/node_modules/phantomjs-prebuilt/bin/phantomjs ${PWD}/bin/phantomjs

PHANTOMJS="${PWD}/bin/phantomjs"

echo "+++++++++++++ Greetings PhantomJS ++++++++++++++"
$PHANTOMJS
