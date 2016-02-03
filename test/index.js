var request = require('supertest'),
    should = require('should'),
    app = require('../app'),
    bill = require('../lib/bill'),
    billNumber = "",
    billInfo = {};
describe('Bill module', function () {
    before(function () {
        billInfo = {
            bill: "aeiou",
            lineItems: [{
                quantity: 5,
                unitPrice: 4
            }, {
                quantity: 2,
                unitPrice: 3
            }]
        };
        billNumber = "00028988";
    });
    it('Given the line items of a bill, returns the correct amount.', function () {
        var expectedAmount = 26,
            realAmount = bill.getAmount(billInfo.lineItems);
        realAmount.should.equal(expectedAmount);
    });
    it('Given the bill info, returns correct format', function () {
        var expectedBill = "aeiou",
            expectedTotal = 26,
            realBill = bill.get(billInfo.bill, bill.getAmount(billInfo.lineItems));
        realBill.bill.should.equal(expectedBill);
        realBill.total.should.equal(expectedTotal);
    });
});
describe('API', function () {
    before(function () {
        billNumber = '00028988';
    });
    it('/GET The total of a bill', function (done) {
        request(app).get('/total?bill=' + billNumber).expect(200).end(function (err, res) {
            if (err) {
                return done(err);
            }
            var expectedTotal = 135.92;
            res.body.bill.should.equal(billNumber);
            res.body.total.should.equal(expectedTotal);
            done();
        });
    });
});
