const express = require("express");
const {
  getAllExpense,
  getExpense,
  createExpense,
  updateExpense,
  softDeleteExpense,
} = require("../controllers/expense");

const expenseRouter = express.Router();

expenseRouter.get("/allExpense", getAllExpense);
expenseRouter.get("/expense/:id", getExpense);
expenseRouter.post("/createExpense", createExpense);
expenseRouter.put("/updateExpense/:id", updateExpense);
expenseRouter.put("/deleteExpense/:id", softDeleteExpense);

module.exports = expenseRouter;
