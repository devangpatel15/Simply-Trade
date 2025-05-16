const ActivityLog = require("../models/ActivityLog");

exports.createLogActivity = async (req, message) => {
  // try {
  //   console.log("req", req);

  //   const user = req?.user || {}; // Safely access req.user
  //   const activityLog = {
  //     userId: req?.id || user.id || null,
  //     role: req?.role || user.role || null,
  //     organization: req?.org || user.org || null,
  //     branchName: req?.orgBranch || user.orgBranch || null,
  //     message,
  //   };

  //   console.log("activityLog", activityLog);

  //   // Ensure the ActivityLog schema is correctly imported
  //   await ActivityLog.create(activityLog);
  //   console.log("Activity logged successfully");
  // } catch (err) {
  //   console.error("Activity logging failed:", err.message);
  // }
  try {
    console.log("Logging activity:", req.user.org);
    await ActivityLog.create({
      userId: req.user.id,
      organization: req.user.org,
      branchName: req.user.orgBranch,
      message,
    });
    console.log("Activity logged successfully");
  } catch (err) {
    console.error("Activity logging failed:", err.message);
  }
};

exports.getAllLogActivity = async (req, res) => {
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

    const logs = await ActivityLog.find()
      .populate("userId", "name")
      .populate("organization")
      .populate("branchName", "branchName")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "mili gayiii", data: logs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch logs", error: err.message });
  }
};
