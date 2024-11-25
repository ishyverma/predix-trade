const { STOCK_BALANCES } = require("../store/variables")

function stockBalance(userId, stockSymbol, stockType, quantity) {
    if (!STOCK_BALANCES[userId]) {
        STOCK_BALANCES[userId] = {
            [stockSymbol]: {
                yes: {
                    quantity: quantity,
                    locked: 0
                }
            }
        }
    } else {
        if (!STOCK_BALANCES[userId][stockSymbol]) {
            STOCK_BALANCES[userId][stockSymbol] = {
                [stockType]: {
                    quantity: quantity,
                    locked: 0
                }
            }
        } else {
            if (!STOCK_BALANCES[userId][stockSymbol][stockType]) {
                STOCK_BALANCES[userId][stockSymbol][stockType] = {
                    quantity: quantity,
                    locked: 0
                }
            } else {
                STOCK_BALANCES[userId][stockSymbol][stockType]['quantity'] += quantity
            }
        }
    }
    return true
}

exports.stockBalance = stockBalance