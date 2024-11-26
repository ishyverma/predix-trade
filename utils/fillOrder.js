const { ORDERBOOK, STOCK_BALANCES, INR_BALANCES } = require("../store/variables")
const { stockBalance } = require("./stockBalance")

function fillOrderBook(userId, stockSymbol, quantity, price, stockType, orderType) {
    if (!STOCK_BALANCES[stockSymbol]) {
        return false
    }
    if (ORDERBOOK[orderType]) {
        if (ORDERBOOK[orderType][stockSymbol]) {
            if (ORDERBOOK[orderType][stockSymbol][stockType]) {
                if (ORDERBOOK[orderType][stockSymbol][stockType][price]) {
                    ORDERBOOK[orderType][stockSymbol][stockType][price]['total'] += quantity
                    if (!ORDERBOOK[orderType][stockSymbol][stockType][price]['orders'][userId]) {
                        ORDERBOOK[orderType][stockSymbol][stockType][price]['orders'][userId] = quantity    
                    } else {
                        ORDERBOOK[orderType][stockSymbol][stockType][price]['orders'][userId] += quantity
                    }
                } else {
                    ORDERBOOK[orderType][stockSymbol][stockType][price] = {
                        total: quantity,
                        orders: {
                            [userId]: quantity
                        }
                    }
                }
            } else {
                ORDERBOOK[orderType][stockSymbol][stockType] = {
                    [price]: {
                        total: quantity,
                        orders: {
                            [userId]: quantity
                        }
                    }
                }
            }
        } else {
            ORDERBOOK[orderType][stockSymbol] = {
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
        ORDERBOOK[orderType] = {
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

    if (orderType === 'buy') {
        INR_BALANCES[userId]['balance'] -= quantity * price
        const addingBalance = stockBalance(userId, stockSymbol, stockType, quantity)
        if (addingBalance) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

exports.fillOrderBook = fillOrderBook   