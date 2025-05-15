const ActivityLog = require("../models/ActivityLog");

const logActivity = async (req, message) => {
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

module.exports = logActivity;
