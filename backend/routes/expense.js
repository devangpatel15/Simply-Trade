const express = require("express");
const {
  getAllExpense,
  getExpense,
  createExpense,
  updateExpense,
  softDeleteExpense,
  getExpenseByDate,
} = require("../controllers/expense");
const {
  createValidation,
  updateOrgValidation,
  deleteOrgValidation,
  getOrgValidation,
} = require("../middleware/expense");
const { AuthUser } = require("../middleware/user");

const expenseRouter = express.Router();

expenseRouter.get("/allExpense", AuthUser, getAllExpense);
expenseRouter.get("/expense/:id", getOrgValidation, getExpense);
expenseRouter.get("/expenseByDate", getExpenseByDate);
expenseRouter.post("/createExpense", createValidation, createExpense);
expenseRouter.put("/updateExpense/:id", updateOrgValidation, updateExpense);
expenseRouter.put("/deleteExpense/:id", deleteOrgValidation, softDeleteExpense);

module.exports = expenseRouter;
