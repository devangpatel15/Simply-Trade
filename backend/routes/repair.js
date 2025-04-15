const express = require("express");
const {
  getAllRepairData,
  createRepair,
  updateRepairData,
  getRepair,
  softDeleteRepair,
} = require("../controllers/repair");
const {
  createRepairData,
  updateRepairDataValidate,
  getRepairValidation,
  deleteRepairValidation,
} = require("../middleware/repair");
const { AuthUser } = require("../middleware/user");

const repairRouter = express.Router();

repairRouter.get("/getAllRepair", AuthUser, getAllRepairData);
repairRouter.get("/getRepair/:id", getRepairValidation, getRepair);
repairRouter.post("/createRepair", createRepairData, createRepair);
repairRouter.put(
  "/updateRepair/:id",
  updateRepairDataValidate,
  updateRepairData
);
repairRouter.put("/deleteRepair/:id", deleteRepairValidation, softDeleteRepair);

module.exports = repairRouter;
