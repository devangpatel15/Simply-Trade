const express = require("express");
const {
  getAllCustomer,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  softDeleteCustomer,
  searchCustomer,
  selectCustomer,
  selectCustomerTest,
} = require("../controllers/customer");
const {
  customerIdValidation,
  createCustomerValidation,
  updateCustomerValidation,
} = require("../middleware/customer");
const { AuthUser } = require("../middleware/user");

const cusRouter = express.Router();

cusRouter.get("/allCustomer",AuthUser, getAllCustomer);
// cusRouter.get("/searchCustomer", searchCustomer);

cusRouter.get("/selectCustomer/:id", selectCustomer);
cusRouter.get("/customer/:id", customerIdValidation, getCustomer);
cusRouter.post("/createCustomer", createCustomerValidation, createCustomer);
cusRouter.put("/updateCustomer/:id", updateCustomerValidation, updateCustomer);
cusRouter.put("/deleteCustomer/:id", customerIdValidation, softDeleteCustomer);

module.exports = cusRouter;
