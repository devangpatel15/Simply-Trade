const Stock = require("../models/stock");
const Expense = require("../models/expense");
exports.getProfitLossService = async (userOrgId, role, userId, req) => {
  const data = await Stock.find({ isSelled: true })
    .populate({
      path: "organization",
      match: role === "user" ? { _id: userOrgId } : { userId: userId },
    })
    .populate("deviceName modelName categoryName branch")
    .lean();

  const filteredData = data.filter((item) => item.organization);

  let totalAmount = 0;
  let totalExpense = 0;
  let totalSelling = 0;
  let totalProfitOrLoss = 0;

  const individualDetails = filteredData.map((stock) => {
    const totalAmountStock = stock.totalAmount || 0;
    const totalExpenseStock = stock.expenseAmount || 0;
    const totalSellingStock = stock.sellAmount || 0;

    const totalCost = totalAmountStock + totalExpenseStock;
    const profitOrLoss = totalSellingStock - totalCost;
    const status =
      profitOrLoss > 0 ? "profit" : profitOrLoss < 0 ? "loss" : "break-even";

    // Accumulate overall totals
    totalAmount += totalAmountStock;
    totalExpense += totalExpenseStock;
    totalSelling += totalSellingStock;
    totalProfitOrLoss += profitOrLoss;

    return {
      ...stock,
      totalAmount: totalAmountStock,
      totalExpense: totalExpenseStock,
      totalSellingAmount: totalSellingStock,
      totalCost,
      profitOrLoss,
      status,
    };
  });

  const generalTotal = await Expense.aggregate([
    {
      $match: {
        category: "General",
        isDeleted: false, // optional: include this if you want to exclude soft-deleted entries
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
  const totalGeneralExpense = generalTotal[0]?.totalAmount || 0;

  const totalAfterExpense = totalProfitOrLoss - totalGeneralExpense;

  const overallStatus =
    totalAfterExpense > 0
      ? "profit"
      : totalAfterExpense < 0
      ? "loss"
      : "break-even";

  return {
    individualDetails,
    overall: {
      totalAmount,
      totalExpense,
      totalSellingAmount: totalSelling,
      totalCost: totalAmount + totalExpense,
      profitOrLoss: totalProfitOrLoss,
      totalGeneralExpense,
      overAllProfitLoss: totalAfterExpense,
      status: overallStatus,
    },
  };
};
