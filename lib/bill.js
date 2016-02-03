exports.getAmount = function (lines) {
    return lines.reduce(function (prev, curr) {
        return prev + curr.quantity * curr.unitPrice;
    }, 0);
};
