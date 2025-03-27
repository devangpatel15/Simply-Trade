const express = require("express")
const { getAllExpense, getExpense, createExpense, updateExpense, softDeleteExpense } = require("../controllers/expense")

const expenseRouter = express.Router()

expenseRouter.get("/allExpense" , getAllExpense)
expenseRouter.get("/expense" , getExpense)
expenseRouter.post("/createExpense" , createExpense)
expenseRouter.put("/updateExpense" , updateExpense)
expenseRouter.put("/deleteExpense" , softDeleteExpense)

module.exports = expenseRouter