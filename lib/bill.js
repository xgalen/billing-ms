exports.getAmount = function (lines) {
    return parseFloat(lines.reduce(function (prev, curr) {
        return prev + curr.quantity * curr.unitPrice;
    }, 0).toFixed(2));
};
exports.get = function (bill, amount) {
    return {
        bill: bill,
        total: amount
    };
};
