const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");

router.get("/activityLog", async (req, res) => {
  try {
    // const { userId, startDate, endDate } = req.query;

    // let filter = {};
    // if (userId) filter.userId = userId;
    // if (startDate && endDate) {
    //   filter.createdAt = {
    //     $gte: new Date(startDate),
    //     $lte: new Date(endDate),
    //   };
    // }

    // const logs = await ActivityLog.find(filter)
    //   .populate("userId", "name")
    //   .populate("organization", "name")
    //   .populate("branchName", "branchName")
    //   .sort({ createdAt: -1 });

    const logs = await ActivityLog.find().populate("userId", "name")
      .populate("organization")
      .populate("branchName", "branchName")
      .sort({ createdAt: -1 });
;

    return res.status(200).json({ message: "mili gayiii", data: logs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch logs", error: err.message });
  }
});

module.exports = router;
