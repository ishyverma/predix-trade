const { Router } = require("express");
const { STOCK_BALANCES, ORDERBOOK } = require("../store/variables");

const router = Router()

// Sorted
router.post("/create/:stockSymbol", (req, res) => {
    const { stockSymbol } = req.params
    USERS_IN_STOCK = Object.keys(STOCK_BALANCES)

    if (USERS_IN_STOCK.length === 0) {
        res.status(404).json({
            message: "No User Exists"
        })
    } else {
        
        for (let i = 0; i < USERS_IN_STOCK.length; i++) {
            STOCK_BALANCES[USERS_IN_STOCK[i]][stockSymbol] = {
                "yes": { quantity: 0, locked: 0 },
                "no": { quantity: 0, locked: 0 }
            }
        }
    
        res.json({
            message: "Symbol created successfully",
            STOCK_BALANCES
        })
    }

})

exports.symbolRouter = router