#!/bin/bash

node-sass --include-path src src/scuk_calc.scss   dist/scuk_calc.css
nodemon -e scss -x "npm run sass" & node server.js