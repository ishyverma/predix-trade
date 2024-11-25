const { ORDERBOOK, STOCK_BALANCES, INR_BALANCES } = require("../store/variables")
const { stockBalance } = require("./stockBalance")

function fillOrderBook(userId, stockSymbol, quantity, price, stockType) {
    if (!STOCK_BALANCES[stockSymbol]) {
        return false
    }
    if (ORDERBOOK["buy"]) {
        if (ORDERBOOK["buy"][stockSymbol]) {
            if (ORDERBOOK["buy"][stockSymbol][stockType]) {
                if (ORDERBOOK["buy"][stockSymbol][stockType][price]) {
                    ORDERBOOK["buy"][stockSymbol][stockType][price]['total'] += quantity
                    if (!ORDERBOOK["buy"][stockSymbol][stockType][price]['orders'][userId]) {
                        ORDERBOOK["buy"][stockSymbol][stockType][price]['orders'][userId] = quantity    
                    } else {
                        ORDERBOOK["buy"][stockSymbol][stockType][price]['orders'][userId] += quantity
                    }
                } else {
                    ORDERBOOK["buy"][stockSymbol][stockType][price] = {
                        total: quantity,
                        orders: {
                            [userId]: quantity
                        }
                    }
                }
            } else {
                ORDERBOOK["buy"][stockSymbol][stockType] = {
                    [price]: {
                        total: quantity,
                        orders: {
                            [userId]: quantity
                        }
                    }
                }
            }
        } else {
            ORDERBOOK["buy"][stockSymbol] = {
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
    } else {
        ORDERBOOK["buy"] = {
            [stockSymbol]: {
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
    }

    INR_BALANCES[userId]['balance'] -= quantity * price
    const addingBalance = stockBalance(userId, stockSymbol, stockType, quantity)
    if (addingBalance) {
        return true
    } else {
        return false
    }
}

exports.fillOrderBook = fillOrderBook   