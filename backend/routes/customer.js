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
  getCustomerByOrg,
  getSellerByOrg,
  getBuyerByOrg,
  getSellerByBranch,
  getBuyerByBranch,
} = require("../controllers/customer");
const {
  customerIdValidation,
  createCustomerValidation,
  updateCustomerValidation,
} = require("../middleware/customer");
const { AuthUser } = require("../middleware/user");

const cusRouter = express.Router();

cusRouter.get("/allCustomer", AuthUser, getAllCustomer);
// cusRouter.get("/searchCustomer", searchCustomer);

cusRouter.get("/selectCustomer/:id", selectCustomer);
cusRouter.get("/customer/:id", customerIdValidation, getCustomer);
cusRouter.post("/createCustomer", createCustomerValidation, createCustomer);
cusRouter.put("/updateCustomer/:id", updateCustomerValidation, updateCustomer);
cusRouter.put("/deleteCustomer/:id", customerIdValidation, softDeleteCustomer);
cusRouter.get("/getCustomerByOrg/:id", getCustomerByOrg);
cusRouter.get("/getSellerByOrg/:id", getSellerByOrg);
cusRouter.get("/getSellerByBranch/:id", getSellerByBranch);
cusRouter.get("/getBuyerByBranch/:id", getBuyerByBranch);
cusRouter.get("/getBuyerByOrg/:id", getBuyerByOrg);

module.exports = cusRouter;
