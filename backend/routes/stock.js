const express = require("express");
const {
  getAllStock,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  softDeleteStock,
  findStockByOrgAndCustomer,
  getAllStockDetails,
} = require("../controllers/stock");
const {
  getStockValidation,
  createValidation,
  updateStockValidation,
  deleteStockValidation,
} = require("../middleware/stock");
const { AuthUser } = require("../middleware/user");

const stockRouter = express.Router();

stockRouter.get("/allStock", AuthUser, getAllStock);
stockRouter.get("/stock/:id", getStockValidation, getStock);
stockRouter.post("/createStock", AuthUser,createValidation, createStock);
stockRouter.put("/updateStock/:id",AuthUser, updateStockValidation, updateStock);
stockRouter.put("/deleteStock/:id", AuthUser,deleteStockValidation, softDeleteStock);
stockRouter.get("/AllStockDetails", getAllStockDetails);

stockRouter.get("/stockByOrgAndCus", findStockByOrgAndCustomer);

module.exports = stockRouter;
