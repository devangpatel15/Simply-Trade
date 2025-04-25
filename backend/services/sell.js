const account = require("../models/account");
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
  const { payment } = newSell;

  payment.forEach(
    async (item) =>
      await account.findByIdAndUpdate(item.paymentAccount, {
        $inc: { balance: +item.paymentAmount },
      })
  );

  const createSell = await Sell.create(newSell);
  const updateStock = await Stock.findByIdAndUpdate(
    stock,
    { isSelled: true, sellAmount: amount },
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
      paymentType: deviceData.paymentType,
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

// exports.getAllStockSellRepairService = async (userOrgId, role, userId, req) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const matchCondition = {
//     isDeleted: false,
//   };

//   // If role is user, restrict by organization ID
//   if (role === "user") {
//     matchCondition.organization = userOrgId;
//   } else {
//     matchCondition["organization.userId"] = userId; // Optional, depending on your schema
//   }

//   // 👉 Aggregation for total amounts
//   const [sellAggregates] = await Sell.aggregate([
//     { $match: matchCondition },
//     {
//       $group: {
//         _id: null,
//         totalAmount: { $sum: "$amount" },
//         paidAmount: { $sum: "$customerPaid" },
//         remainingAmount: { $sum: "$remainingAmount" },
//       },
//     },
//   ]);

//   const [stockAggregates] = await Stock.aggregate([
//     { $match: matchCondition },
//     {
//       $group: {
//         _id: null,
//         totalAmount: { $sum: "$totalAmount" },
//         paidAmount: { $sum: "$paidToCustomer" },
//         remainingAmount: { $sum: "$remainingAmount" },
//       },
//     },
//   ]);
//   const [repairAggregates] = await Repair.aggregate([
//     { $match: matchCondition },
//     {
//       $group: {
//         _id: null,
//         totalAmount: { $sum: "$amount" },
//         estimatedCost: { $sum: "$estimatedCost" },
//       },
//     },
//   ]);

//   // 👇 Regular paginated fetch
//   const sellData = await Sell.find({ isDeleted: false })
//     .populate({
//       path: "organization",
//       match: role == "user" ? { _id: userOrgId } : { userId: userId },
//     })
//     .populate("branch customerName modelName deviceName")
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   const stockData = await Stock.find({ isDeleted: false })
//     .populate({
//       path: "organization",
//       match: role == "user" ? { _id: userOrgId } : { userId: userId },
//     })
//     .populate(
//       "branch customerName categoryName modelName deviceName capacityName color"
//     )
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   const repairData = await Repair.find({ isDeleted: false })
//     .populate({
//       path: "organization",
//       match: role == "user" ? { _id: userOrgId } : { userId: userId },
//     })
//     .populate("branch customerName modelName deviceName")
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   const sellCount = await Sell.countDocuments({ isDeleted: false });
//   const stockCount = await Stock.countDocuments({ isDeleted: false });
//   const repairCount = await Repair.countDocuments({ isDeleted: false });

//   return {
//     totalCount: sellCount + stockCount + repairCount,
//     items: {
//       sellData,
//       stockData,
//       repairData,
//     },
//     sellTotals: sellAggregates || {
//       totalAmount: 0,
//       paidAmount: 0,
//       remainingAmount: 0,
//     },
//     sellCount,
//     stockTotals: stockAggregates || {
//       totalAmount: 0,
//       paidAmount: 0,
//       remainingAmount: 0,
//     },
//     stockCount,
//     repairTotals: repairAggregates || {
//       totalAmount: 0,
//       paidAmount: 0,
//       remainingAmount: 0,
//     },
//     repairCount,
//   };
// };

exports.getSellByDateService = async ({ startDate, endDate }) => {
  const filter = { isDeleted: false };

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid date format");
    }

    filter.createdAt = {
      $gte: start,
      $lte: end,
    };

    const result = await Sell.find(filter)
      .populate("organization branch modelName deviceName customerName stock")
      .lean();

    return result;
  } catch (err) {
    console.error("❌ Error in getExpenseByDateService:", err.message);
    throw err;
  }
};
exports.getAllStockSellRepairService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const type = req.query.type || "all"; // 'all', 'sell', 'stock', or 'repair'

  const orgId = req.query.orgId;
  const cusId = req.query.cusId;

  // Base match condition
  const baseMatchCondition = {
    isDeleted: false,
  };

  if (role === "user") {
    baseMatchCondition.organization = userOrgId;
  } else {
    baseMatchCondition["organization.userId"] = userId;
  }

  // Add filters if present
  if (orgId) {
    baseMatchCondition.organization = orgId;
  }

  if (cusId) {
    baseMatchCondition.customerName = cusId;
  }

  const result = {
    totalCount: 0,
    items: {},
    sellTotals: null,
    sellCount: 0,
    stockTotals: null,
    stockCount: 0,
    repairTotals: null,
    repairCount: 0,
  };

  // SELL
  if (type === "all" || type === "sell") {
    const [sellAggregates] = await Sell.aggregate([
      { $match: baseMatchCondition },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          paidAmount: { $sum: "$customerPaid" },
          remainingAmount: { $sum: "$remainingAmount" },
        },
      },
    ]);

    const sellData = await Sell.find(baseMatchCondition)
      .populate({
        path: "organization",
        match: role === "user" ? { _id: userOrgId } : { userId },
      })
      .populate("branch customerName modelName deviceName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const sellCount = await Sell.countDocuments(baseMatchCondition);

    result.items.sellData = sellData;
    result.sellTotals = sellAggregates || {
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
    };
    result.sellCount = sellCount;
    result.totalCount += sellCount;
  }

  // STOCK
  if (type === "all" || type === "stock") {
    const [stockAggregates] = await Stock.aggregate([
      { $match: baseMatchCondition },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
          paidAmount: { $sum: "$paidToCustomer" },
          remainingAmount: { $sum: "$remainingAmount" },
        },
      },
    ]);

    const stockData = await Stock.find(baseMatchCondition)
      .populate({
        path: "organization",
        match: role === "user" ? { _id: userOrgId } : { userId },
      })
      .populate(
        "branch customerName categoryName modelName deviceName capacityName color"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const stockCount = await Stock.countDocuments(baseMatchCondition);

    result.items.stockData = stockData;
    result.stockTotals = stockAggregates || {
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
    };
    result.stockCount = stockCount;
    result.totalCount += stockCount;
  }

  // REPAIR
  if (type === "all" || type === "repair") {
    const [repairAggregates] = await Repair.aggregate([
      { $match: baseMatchCondition },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          estimatedCost: { $sum: "$estimatedCost" },
        },
      },
    ]);

    const repairData = await Repair.find(baseMatchCondition)
      .populate({
        path: "organization",
        match: role === "user" ? { _id: userOrgId } : { userId },
      })
      .populate("branch customerName modelName deviceName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const repairCount = await Repair.countDocuments(baseMatchCondition);

    result.items.repairData = repairData;
    result.repairTotals = repairAggregates || {
      totalAmount: 0,
      estimatedCost: 0,
    };
    result.repairCount = repairCount;
    result.totalCount += repairCount;
  }

  return result;
};
