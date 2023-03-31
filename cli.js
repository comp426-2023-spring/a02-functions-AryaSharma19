#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2));

if (args.h) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`)
    process.exit(0)
} 

const timezone = args.z || moment.tz.guess();
var lat = args.n || args.s;
var lon = args.e || args.w;
const day = args.d;

if (args.s && lat > 0) {
    lat *= -1;
}


if (args.w && lon > 0) {
    lon *= -1;
}

const days_wanted = 7;

const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +'&longitude=' + lon +'&timezone=' + timezone + '&forecast_days=' + days_wanted + '&daily=precipitation_hours';
const response = await fetch(url);
const data = await response.json();

if (args.j){
    console.log(data);
    process.exit(0);
}


if (data.daily.precipitation_hours[day || 1] > 0) {
    process.stdout.write("You might need your galoshes ");
} else {
    process.stdout.write("You will not need your galoshes ");
}

if (day == 0) {
    console.log("today.");
} else if (day > 1) {
    console.log("in " + day + " days.");
} else {
    console.log("tomorrow.");
}

process.exit(0);