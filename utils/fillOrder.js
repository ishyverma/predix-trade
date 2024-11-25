const { ORDERBOOK, STOCK_BALANCES, INR_BALANCES } = require("../store/variables")
const { stockBalance } = require("./stockBalance")

function fillOrder(userId, stockSymbol, quantity, price, stockType) {
    if (!STOCK_BALANCES[stockSymbol]) {
        return false
    }
    if (ORDERBOOK[stockSymbol]) {
        if (ORDERBOOK[stockSymbol][stockType]) {
            if (ORDERBOOK[stockSymbol][stockType][price]) {
                ORDERBOOK[stockSymbol][stockType][price]['total'] += quantity
                if (!ORDERBOOK[stockSymbol][stockType][price]['orders'][userId]) {
                    ORDERBOOK[stockSymbol][stockType][price]['orders'][userId] = quantity    
                } else {
                    ORDERBOOK[stockSymbol][stockType][price]['orders'][userId] += quantity
                }
            } else {
                ORDERBOOK[stockSymbol][stockType][price] = {
                    total: quantity,
                    orders: {
                        [userId]: quantity
                    }
                }
            }
        } else {
            ORDERBOOK[stockSymbol][stockType] = {
                [price]: {
                    total: quantity,
                    orders: {
                        [userId]: quantity
                    }
                }
            }
        }
    } else {
        ORDERBOOK[stockSymbol] = {
            [stockType]: {
                [price]: {
                    total: quantity,
                    orders: {
                        [userId]: quantity
                    }
                }
            }
        }
    }

    INR_BALANCES[userId]['balance'] -= quantity * price
    const addingBalance = stockBalance(userId, stockSymbol, stockType, quantity)
    if (addingBalance) {
        return true
    } else {
        return false
    }
}

exports.fillOrder = fillOrder   