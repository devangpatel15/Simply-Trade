const express = require('express')
const { getAllCustomer, getCustomer, createCustomer, updateCustomer, deleteCustomer, softDeleteCustomer, searchCustomer } = require('../controllers/customer')
const { customerIdValidation, createCustomerValidation, updateCustomerValidation } = require('../middleware/customer')

const cusRouter = express.Router()

cusRouter.get("/allCustomer",getAllCustomer)
cusRouter.get("/searchCustomer",searchCustomer)
cusRouter.get("/customer/:id",customerIdValidation,getCustomer)
cusRouter.post("/createCustomer",createCustomerValidation,createCustomer)
cusRouter.put("/updateCustomer/:id",updateCustomerValidation,updateCustomer)
cusRouter.put("/deleteCustomer/:id",customerIdValidation,softDeleteCustomer)

module.exports = cusRouter