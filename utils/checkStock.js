const { STOCK_BALANCES } = require("../store/variables")

function checkStock() {
    if (Object.keys(STOCK_BALANCES).length === 0) {
        return false
    } else {
        return true
    }
}

exports.checkStock = checkStock