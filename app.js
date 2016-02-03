var express = require('express'),
    app = module.exports = express(),
    userId = 'sewriiojclvkslwr',
    request = require('basic-request');
global.token = global.token || getToken(userId);

function getToken(id) {
    request.get('http://billing.mediasmart.mobi/api/auth?user=' + id, function (error, body) {
        if (error) {
            console.error('Could not access billing auth: %s', error);
            return;
        }
	token = JSON.parse(body).token;
    });
}
