const { getProfitLossService } = require("../services/profitLoss");

exports.getProfitLoss = async (req, res) => {
  try {
    const userOrgId = req.user.org;
    const role = req.user.role;
    const userId = req.user.id;

    console.log(req.user);

    console.log("orgId", userOrgId, role, userId);

    const profitLoss = await getProfitLossService(userOrgId, role, userId, req);
    if (!profitLoss) {
      return res.status(404).json({ message: "No ProfitLoss found" });
    }

    return res.status(200).json({
      message: "ProfitLoss retrieved successfully",
      data: profitLoss,
    });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
