const express = require('express');
const reCAPTCHA = express();
const bodyParser = require('body-parser');
const request = require('request');
const verifyRouteRoute = require('./mws/verify');

reCAPTCHA.use(bodyParser.urlencoded({ extended: false }));
reCAPTCHA.use(bodyParser.json());

reCAPTCHA.get('/verify', verifyRouteRoute);

module.exports = reCAPTCHA;
