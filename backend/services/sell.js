const Repair = require("../models/repair");
const Sell = require("../models/sell");
const Stock = require("../models/stock");

exports.getAllSellService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const data = await Sell.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: role == "user" ? { _id: userOrgId } : { userId: userId },
    })
    .populate("branch customerName modelName deviceName stock")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Sell.countDocuments({
    isDeleted: false,
  });

  return { totalCount, items: data };
};

exports.getSellService = async (sellId) => {
  const sellData = await Sell.findById(sellId)
    .populate("organization branch customerName modelName deviceName stock")
    .lean();
  return sellData;
};

exports.createSellService = async (newSell, stock, amount) => {
  const createSell = await Sell.create(newSell);
  const updateStock = await Stock.findByIdAndUpdate(
    stock,
    { isDeleted: true, sellAmount: amount },
    {
      new: true,
    }
  );

  return { createSell, updateStock };
};

exports.updateSellService = async (sellId, sell) => {
  console.log(sellId, "sellId");
  console.log(sell, "sell");

  const deviceData = sell && sell.device && sell.device[0];

  const data = await Sell.findByIdAndUpdate(
    sellId,
    {
      amount: deviceData.amount,
      customerPaid: deviceData.customerPaid,
      remainingAmount: deviceData.remainingAmount,
    },
    { new: true }
  );

  // console.log(data, "77777777");
  return data;
};

exports.softDeleteSellService = async (sellId) => {
  return await Sell.findByIdAndUpdate(sellId, { isDeleted: true });
};

exports.deleteSellService = async (sellId) => {
  return await Sell.findByIdAndDelete(sellId);
};

exports.getAllStockSellRepairService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const matchCondition = {
    isDeleted: false,
  };

  // If role is user, restrict by organization ID
  if (role === "user") {
    matchCondition.organization = userOrgId;
  } else {
    matchCondition["organization.userId"] = userId; // Optional, depending on your schema
  }

  // 👉 Aggregation for total amounts
  const [sellAggregates] = await Sell.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        paidAmount: { $sum: "$customerPaid" },
        remainingAmount: { $sum: "$remainingAmount" },
      },
    },
  ]);

  const [stockAggregates] = await Stock.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalAmount" },
        paidAmount: { $sum: "$paidToCustomer" },
        remainingAmount: { $sum: "$remainingAmount" },
      },
    },
  ]);
  const [repairAggregates] = await Repair.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        estimatedCost: { $sum: "$estimatedCost" },
      },
    },
  ]);

  // 👇 Regular paginated fetch
  const sellData = await Sell.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: role == "user" ? { _id: userOrgId } : { userId: userId },
    })
    .populate("branch customerName modelName deviceName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const stockData = await Stock.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: role == "user" ? { _id: userOrgId } : { userId: userId },
    })
    .populate(
      "branch customerName categoryName modelName deviceName capacityName color"
    )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const repairData = await Repair.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: role == "user" ? { _id: userOrgId } : { userId: userId },
    })
    .populate("branch customerName modelName deviceName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Sell.countDocuments({ isDeleted: false });

  return {
    totalCount,
    items: {
      sellData,
      stockData,
      repairData,
    },
    sellTotals: sellAggregates || {
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
    },
    stockTotals: stockAggregates || {
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
    },
    stockTotals: repairAggregates || {
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
    },
  };
};
