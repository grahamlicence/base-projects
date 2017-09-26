#!/bin/bash

cp -R templates/. dist/
nodemon -e scss -x "npm run sass && npm run js" & node server.js
