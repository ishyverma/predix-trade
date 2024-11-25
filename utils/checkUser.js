const { INR_BALANCES } = require("../store/variables");

function checkUser(userId) {
    if (INR_BALANCES[userId]) {
        return true
    } else {
        return false
    }
}

exports.checkUser = checkUser