const { Router } = require("express");
const { INR_BALANCES, ORDERBOOK, STOCK_BALANCES } = require("../store/variables");

const router = Router()

router.post("/buy", (req, res) => {
    const { userId, stockSymbol, quantity, price, stockType } = req.body
    // Checking whether the stockSymbol is there in the STOCK_BALANCES
    if (Object.keys(STOCK_BALANCES).length === 0) {
        res.status(404).json({
            message: `There is no stock of name ${stockSymbol}`
        }) 
        
    } 
    
    else if (Object.keys(INR_BALANCES).length === 0) {
        res.status(404).json({
            message: "Please check user balances"
        })
        
    } 

    else if (INR_BALANCES[userId] === undefined) {
        res.status(404).json({
            message: "No user found"
        })
    }

    // Checking whether the price of the stocks is greater than the balance of the users wallet
    else if ((price * quantity) > INR_BALANCES[userId]["balance"]) {
        res.status(404).json({
            message: "Balance not sufficient"
        })
    }

    else {
        if (STOCK_BALANCES[userId] === undefined) {
            STOCK_BALANCES[userId] = {
                [stockSymbol]: {
                    yes: {
                        quantity,
                        locked: 0
                    }, 
                    no: {
                        quantity: 0,
                        locked: 0
                    }                    
                }
            }
        } else {
            STOCK_BALANCES[userId][stockSymbol]["yes"].quantity += quantity
        }

        // Re-evaluating user's balance
        INR_BALANCES[userId]["balance"] -= quantity * price
        
        if (Object.keys(ORDERBOOK).length === 0) {
            ORDERBOOK[stockSymbol] = {
    
            }
            ORDERBOOK[stockSymbol][stockType] = {
    
            }
            ORDERBOOK[stockSymbol][stockType][price] = {
                total: quantity,
                orders: {
                    [userId]: quantity
                }
            }
        } else if (stockSymbol in Object.keys(ORDERBOOK[stockSymbol])) {
            console.log(stockSymbol)
        }
        res.json({
            message: "Order placed successfully in ordebook"
        })
    }
})

exports.orderRouter = router