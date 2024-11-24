const express = require("express")
const { userRouter } = require("./routes/user.router")
const { symbolRouter } = require("./routes/symbol.router")
const { ORDERBOOK, INR_BALANCES, STOCK_BALANCES } = require("./store/variables")
const { balanceRouter } = require("./routes/balance.router")
const { orderRouter } = require("./routes/order.router")

const app = express()
app.use(express.json())

app.use("/user", userRouter)
app.use("/symbol", symbolRouter)
app.use("/balances", balanceRouter)
app.use("/order", orderRouter)

// Sorted
app.get("/orderbook", (req, res) => {
    res.json({
        ORDERBOOK
    })
})

// Sorted
app.post("/reset", (req, res) => {
    for (let keys of Object.keys(ORDERBOOK)) {
        delete ORDERBOOK[keys]
    }
    for (let keys of Object.keys(INR_BALANCES)) {
        delete INR_BALANCES[keys]
    }
    for (let keys of Object.keys(STOCK_BALANCES)) {
        delete STOCK_BALANCES[keys]
    }
    res.json({
        message: "All state variables reseted"
    })
})

// Sorted
app.post("/onramp/inr", (req, res) => {
    const { userId, amount } = req.body
    if (INR_BALANCES[userId]) {
        INR_BALANCES[userId]["balance"] += amount
        res.json({
            message: "Amount added successfully"
        })
    } else {
        res.status(404).json({
            message: "User not registered"
        })
    }
})

app.listen(3000)