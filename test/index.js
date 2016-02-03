var request = require('supertest'),
    should = require('should'),
    bill = require('../lib/bill'),
    billInfo = {};
describe('Total amount', function () {
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
    });
    it('Given the line items of a bill, returns the correct amount.', function () {
        var expectedAmount = 26,
            realAmount = bill.getAmount(billInfo.lineItems);
        realAmount.should.equal(expectedAmount);
    });
    it('Given the bill info, returns correct format', function () {
        var expectedBill = "aeiou",
            expectedTotal = 26,
            realBill = bill.get(billInfo);
        realBill.bill.should.equal(expectedBill);
        realBill.total.should.equal(expectedTotal);
    });
});
