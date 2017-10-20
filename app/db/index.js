"use strict";

const mongoose = require('mongoose');
const isProduction = (process.env.NODE_ENV === 'production');
const db = require('../config/index');


// module.exports = 