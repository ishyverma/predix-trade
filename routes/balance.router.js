const { Router } = require("express");
const { INR_BALANCES, STOCK_BALANCES } = require("../store/variables");

const router = Router()

// Sorted
router.get("/inr", (req, res) => {
    res.json({
        INR_BALANCES
    })
})

// Sorted
router.get("/stock", (req, res) => {
    res.json({
        STOCK_BALANCES
    })
})

// Sorted
router.get("/inr/:userId", (req, res) => {
    const { userId } = req.params
    if (INR_BALANCES[userId]) {
        res.json({
            balance: INR_BALANCES[userId]["balance"]
        })
    } else {
        res.status(404).json({
            message: "No user exists of this userId"
        })
    }
})

// Sorted
const balanceFinder = (userId) => {
    let response = {}
    for (const stockName in STOCK_BALANCES[userId]) {
        for (const stockType in STOCK_BALANCES[userId][stockName]) {
            const { quantity, locked } = STOCK_BALANCES[userId][stockName][stockType]
            response[stockName] = quantity
        }
    }
    return response
}

// Sorted
router.get("/stock/:userId", (req, res) => {
    const { userId } = req.params
    if (STOCK_BALANCES[userId]) {
        const balance = balanceFinder(userId)
        res.json({
            balance: balance
        })
    } else {
        res.status(404).json({
            message: "User not exists here"
        })
    }
})

exports.balanceRouter = router