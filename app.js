var express = require('express'),
    app = module.exports = express(),
    api = require('./lib/api'),
    cookieSession = require('cookie-session'),
    request = require('basic-request');
app.use(cookieSession({
    secret: 'apitest'
}));
app.use(function (req, res, next) {
    if (req.session.token) {
        return next();
    } else {
        request.get('http://billing.mediasmart.mobi/api/auth?user=sewriiojclvkslwr', function (error, body) {
            if (error) {
                console.error('Could not access billing auth: %s', error);
                return res.status(404).send('Error auth');
            }
            req.session.token = JSON.parse(body).token;
	    return next();
        });
    }
});
app.get('/total', api.getInfo, api.getAmount, api.get);
