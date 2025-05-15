const express = require("express");
const { getAllLogActivity } = require("../utils/logActivity");
const activityLogRouter = express.Router();

activityLogRouter.get("/getActivityLog",getAllLogActivity );

module.exports = activityLogRouter;
