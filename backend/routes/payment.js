const express = require("express")
const { getAllPayment, getPayment, createPayment, updatePayment, softDeletePayment } = require("../controllers/payment")
const { createPaymentValidation, updatePaymentValidation, getPaymentValidation } = require("../middleware/payment")

const paymentRouter = express.Router()

paymentRouter.get("/allPayment",getAllPayment)
paymentRouter.get("/payment/:id",getPaymentValidation,getPayment)
paymentRouter.post("/createPayment",createPaymentValidation,createPayment)
paymentRouter.put("/updatePayment/:id",updatePaymentValidation,updatePayment)
paymentRouter.put("/deletePayment/:id",softDeletePayment)

module.exports = paymentRouter