const express = require("express");
const {
  getAllStock,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  softDeleteStock,
} = require("../controllers/stock");
const {
  getStockValidation,
  createValidation,
  updateStockValidation,
  deleteStockValidation,
} = require("../middleware/stock");
const { AuthUser } = require("../middleware/user");

const stockRouter = express.Router();

stockRouter.get("/allStock",AuthUser, getAllStock);
stockRouter.get("/stock/:id", getStockValidation, getStock);
stockRouter.post("/createStock", createValidation, createStock);
stockRouter.put("/updateStock/:id", updateStockValidation, updateStock);
stockRouter.put("/deleteStock/:id", deleteStockValidation, softDeleteStock);

module.exports = stockRouter;
