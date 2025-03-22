const express = require("express")
const { getAllAccount, getAccount, createAccount, updateAccount, deleteAccount } = require("../controllers/account")

const accountRouter = express.Router()

accountRouter.get("/allAccount", getAllAccount)
accountRouter.get("/account/:id" , getAccount)
accountRouter.post("/createAccount",createAccount)
accountRouter.put("/updateAccount/:id", updateAccount)
accountRouter.put("/deleteAccount", deleteAccount)

module.exports = accountRouter