const { Router } = require("express");
const { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } = require("../store/variables");
const { checkStock } = require("../utils/checkStock");
const { checkUser } = require("../utils/checkUser");
const { checkBalance } = require("../utils/checkBalance");
const { fillOrder } = require("../utils/fillOrder");
const { stockBalance } = require("../utils/stockBalance");

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
    const fillOrderBook = fillOrder(userId, stockSymbol, quantity, price, stockType)
    if (fillOrderBook) {
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