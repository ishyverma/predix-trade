const { INR_BALANCES } = require("../store/variables");

function checkBalance(quantity, price, userId) {
    if ((quantity * price) > INR_BALANCES[userId]['balance']) {
        return false
    } else {
        return true
    }
} 

exports.checkBalance = checkBalance