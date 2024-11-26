const { Router } = require("express");
const { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } = require("../store/variables");
const { checkStock } = require("../utils/checkStock");
const { checkUser } = require("../utils/checkUser");
const { checkBalance } = require("../utils/checkBalance");
const { fillOrderBook } = require("../utils/fillOrder");
const { stockBalance } = require("../utils/stockBalance");
const { quantityFill } = require("../utils/quantityFiller");

const router = Router()

router.post("/buy", (req, res) => {
    const { userId, stockSymbol, quantity, price, stockType } = req.body

    const isStock = checkStock(userId, stockSymbol, stockType)
    if (!isStock) {
        return res.status(404).json({
            message: `There is no stock of name ${stockSymbol}`
        }) 
    }

    const checkUserBalance = checkBalance(quantity, price, userId)
    if(!checkUserBalance) {
        return res.status(404).json({
            message: "Balance not sufficient"
        })  
    } 

    const isUser = checkUser(userId)
    if(!isUser) {
        return res.status(404).json({
            message: "No user found"
        })
    }
    
    const quantityFillOrder = quantityFill(userId, stockSymbol, quantity, price, stockType)
    if (quantityFillOrder === 0) {
        res.json({
            message: 'Bought stocks'
        })
    } else {
        const OrderBook = fillOrderBook(userId, stockSymbol, quantity, price, stockType, orderType="buy")
        if (OrderBook) {
            return res.json({
                message: "Order placed Successfully"
            })
        } else {
            return res.status(404).json({
                message: "No stocks found of this name"
            })
        }
    }
})

router.post("/sell", (req, res) => {
    const { userId, stockSymbol, quantity, price, stockType } = req.body
    
    const isUser = checkUser(userId)
    if(!isUser) {
        return res.status(404).json({
            message: "No user found"
        })
    }
    const OrderBook = fillOrderBook(userId, stockSymbol, quantity, price, stockType, orderType="sell")
    if (OrderBook) {
        return res.json({
            message: "Order placed Successfully"
        })
    } else {
        return res.status(404).json({
            message: "No stocks found of this name"
        })
    }
})

exports.orderRouter = router