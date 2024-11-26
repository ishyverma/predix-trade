const { ORDERBOOK, INR_BALANCES, STOCK_BALANCES } = require("../store/variables")
const { stockBalance } = require("./stockBalance")

const quantityFill = (userId, stockSymbol, quantity, price, stockType) => {
    let remainingQuantity = quantity
    if (ORDERBOOK['sell']) {
        if (ORDERBOOK['sell'][stockSymbol]) {
            if (ORDERBOOK['sell'][stockSymbol][stockType]) {
                const priceArray = Object.keys(ORDERBOOK['sell'][stockSymbol][stockType]).map(price => parseFloat(price)).sort((a, b) => b - a)
                for (let i = priceArray.length - 1; i >= 0; i--) {
                    if (priceArray[i] > price) {
                        break
                    } 
                    if (ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['total'] > remainingQuantity) {
                        ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['total'] -= quantity
                        const allUsers = Object.keys(ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['orders'])
                        for (let i = 0; i < allUsers.length; i++) {
                            if (ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['orders'][allUsers[i]] > quantity) {
                                if (remainingQuantity != 0) {
                                    ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['orders'][allUsers[i]] -= quantity
                                    stockBalance(userId, stockSymbol, stockType, remainingQuantity)
                                    return remainingQuantity
                                }  else {
                                    break
                                }
                            }
                        }
                    } else {
                        remainingQuantity -= ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['total']
                        const allUsers = Object.keys(ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['orders'])
                        for (let i = 0; i < allUsers.length; i++) {
                            delete ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['orders'][allUsers[i]]
                        }
                        delete ORDERBOOK['sell'][stockSymbol][stockType][priceArray[i]]['total']
                        stockBalance(userId, stockSymbol, stockType, remainingQuantity)
                        return remainingQuantity
                    }
                }
            } else {
                return remainingQuantity
            }
        } else {
            return remainingQuantity
        }
    } else {
        return remainingQuantity
    }
}

exports.quantityFill = quantityFill