#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2));
console.log(args)