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

repairRouter.get("/getAllRepairData", AuthUser, getAllRepairData);
repairRouter.get("/getRepair/:id", getRepairValidation, getRepair);
repairRouter.post("/createRepairData", createRepairData, createRepair);
repairRouter.put(
  "/updateRepairData/:id",
  updateRepairDataValidate,
  updateRepairData
);
repairRouter.put("/deleteRepair/:id", deleteRepairValidation, softDeleteRepair);

module.exports = repairRouter;
