exports.getAmount = function (lines) {
    return lines.reduce(function (prev, curr) {
        return prev + curr.quantity * curr.unitPrice;
    }, 0);
};
exports.get = function (info) {
    return {
        bill: info.bill,
        total: this.getAmount(info.lineItems)
    };
};
