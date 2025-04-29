const express = require("express");
const {
  getAllAccount,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  selectAccountByBranch,
} = require("../controllers/account");
const { AuthUser } = require("../middleware/user");

const accountRouter = express.Router();

accountRouter.get("/allAccount", AuthUser, getAllAccount);
accountRouter.get("/account/:id", getAccount);
accountRouter.post("/createAccount", createAccount);
accountRouter.put("/updateAccount/:id", updateAccount);
accountRouter.put("/deleteAccount/:id", deleteAccount);
accountRouter.get("/selectAccountByBranch", selectAccountByBranch);

module.exports = accountRouter;
