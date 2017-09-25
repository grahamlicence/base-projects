#!/bin/bash

node-sass --include-path src src/main.scss   dist/assets/main.css
nodemon -e scss -x "npm run sass" & node server.js
