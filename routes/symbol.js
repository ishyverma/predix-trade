const { Router } = require("express");
const { STOCK_BALANCES, ORDERBOOK } = require("../store/variables");

const router = Router()

// Sorted
router.post("/create/:stockSymbol", (req, res) => {
    const { stockSymbol } = req.params
    if (STOCK_BALANCES[stockSymbol]) {
        res.status(404).json({
            message: "Symbol already created"
        })
    } else {
        STOCK_BALANCES[stockSymbol] = {
            yes: { quantity: 0, locked: 0 },
            no: { quantity: 0, locked: 0 }
        }
        res.json({
            message: "Symbol created successfully"
        })
    }

})

exports.symbolRouter = router