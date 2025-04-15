const express = require("express");
const { AuthUser } = require("../middleware/user");
const {
  getAllSell,
  getSell,
  createSell,
  updateSell,
  softDeleteSell,
} = require("../controllers/sell");
const {
  getSellValidation,
  createSellData,
  updateSellData,
  deleteSellValidation,
} = require("../middleware/sell");

const sellRouter = express.Router();

sellRouter.get("/allSell", AuthUser, getAllSell);
sellRouter.get("/sell/:id", getSellValidation, getSell);
sellRouter.post("/createSell", createSellData, createSell);
sellRouter.put("/updateSell/:id", updateSellData, updateSell);
sellRouter.put("/deleteSell/:id", deleteSellValidation, softDeleteSell);

module.exports = sellRouter;
