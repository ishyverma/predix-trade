const { Router } = require("express");
const { INR_BALANCES, STOCK_BALANCES } = require("../store/variables");

const router = Router()

// Sorted
router.post("/create/:userId", (req, res) => {
    const { userId } = req.params

    if (INR_BALANCES[userId]) {
        res.status(404).json({
            message: "User already created"
        })
    } else {
        INR_BALANCES[userId] = {
            balance: 0,
            locked: 0
        }
        STOCK_BALANCES[userId] = {

        }
        res.json({
            message: "User created succesffully"
        })
    }
})

exports.userRouter =  router 