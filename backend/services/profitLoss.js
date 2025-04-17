const Stock = require("../models/stock");
exports.getProfitLossService = async (userOrgId, role, userId, req) => {
  const data = await Stock.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: role === "user" ? { _id: userOrgId } : { userId: userId },
    })
    .lean();

  const filteredData = data.filter((item) => item.organization);

  let totalAmount = 0;
  let totalExpense = 0;
  let totalSelling = 0;

  for (const stock of filteredData) {
    totalAmount += stock.totalAmount || 0;
    totalExpense += stock.expenseAmount || 0;
    totalSelling += stock.sellAmount || 0;
  }

  const totalCost = totalAmount + totalExpense;
  const profitOrLoss = totalSelling - totalCost;
  const status =
    profitOrLoss > 0 ? "profit" : profitOrLoss < 0 ? "loss" : "break-even";

  return {
    data: filteredData,
    totalAmount,
    totalExpense,
    totalSellingAmount: totalSelling,
    totalCost,
    profitOrLoss,
    status,
  };
};
