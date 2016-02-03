var request = require('basic-request'),
    url = require('url'),
    app = require('../app'),
    bill = require('./bill');
exports.getInfo = function (req, res, next) {
    var url_parts = url.parse(req.url, true),
        query = url_parts.query,
        getUrl = 'http://billing.mediasmart.mobi/api/bill?token=' + req.session.token + '&bill=' + query.bill;
    request.get(getUrl, function (error, body) {
	    console.log(getUrl);
        if (error) {
            console.error('Could not access API: %s', error);
            return res.status(404).send('Could not access API');
        }
        res.locals.billInfo = JSON.parse(body);
        return next();
    });
};
exports.getAmount = function (req, res, next) {
    res.locals.billAmount = bill.getAmount(res.locals.billInfo.lineItems);
    return next();
};
exports.get = function (req, res, next) {
    return res.json(bill.get(res.locals.billInfo.bill, res.locals.billAmount));
};
