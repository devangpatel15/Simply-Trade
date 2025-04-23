const Account = require("../models/account");
const Stock = require("../models/stock");

// exports.getAllStockService = async (userOrgId, role, userId, req) => {
//   const page = parseInt(req.query.page) || 1; // Default to page 1
//   const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
//   const search = req.query.search || "";

//   const skip = (page - 1) * limit;

//   const query = { imeiNo: { $regex: search, $options: "i" } };

//   const data = await Stock.find({ ...query, isDeleted: false, isSelled: false })
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
//   const filterData = data.filter((item) => {
//     return item.organization != null;
//   });

//   const totalCount = await Stock.countDocuments({
//     ...query,
//     isDeleted: false,
//     isSelled: false,
//   });

//   return { totalCount, items: filterData };
// };

const mongoose = require("mongoose");

exports.getAllStockService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";

  const matchStage = {
    isDeleted: false,
    isSelled: false,
  };

  if (role === "user") {
    matchStage.organization = new mongoose.Types.ObjectId(userOrgId);
  }

  const pipeline = [
    { $match: matchStage },

    // Lookup for Model (for searching)
    {
      $lookup: {
        from: "models",
        localField: "modelName",
        foreignField: "_id",
        as: "modelName",
      },
    },
    { $unwind: "$modelName" },

    // Search by IMEI or model.modelName
    {
      $match: {
        $or: [
          { imeiNo: { $regex: search, $options: "i" } },
          { "modelName.modelName": { $regex: search, $options: "i" } },
        ],
      },
    },

    // Lookup all other refs (simulate full populate)
    {
      $lookup: {
        from: "organizations",
        localField: "organization",
        foreignField: "_id",
        as: "organization",
      },
    },
    { $unwind: "$organization" },

    {
      $lookup: {
        from: "organizationbranches",
        localField: "branch",
        foreignField: "_id",
        as: "branch",
      },
    },
    { $unwind: "$branch" },

    {
      $lookup: {
        from: "customers",
        localField: "customerName",
        foreignField: "_id",
        as: "customerName",
      },
    },
    { $unwind: { path: "$customerName", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "categories",
        localField: "categoryName",
        foreignField: "_id",
        as: "categoryName",
      },
    },
    { $unwind: "$categoryName" },

    {
      $lookup: {
        from: "devices",
        localField: "deviceName",
        foreignField: "_id",
        as: "deviceName",
      },
    },
    { $unwind: "$deviceName" },

    {
      $lookup: {
        from: "capacities",
        localField: "capacityName",
        foreignField: "_id",
        as: "capacityName",
      },
    },
    { $unwind: "$capacityName" },

    {
      $lookup: {
        from: "colors",
        localField: "color",
        foreignField: "_id",
        as: "color",
      },
    },
    { $unwind: "$color" },

    {
      $lookup: {
        from: "payments",
        localField: "payment",
        foreignField: "_id",
        as: "payment",
      },
    },
    { $unwind: { path: "$payment", preserveNullAndEmptyArrays: true } },

    // Sorting and Pagination
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ];

  const data = await mongoose.model("Stock").aggregate(pipeline);

  // Get total count with same search/match conditions (but no pagination)
  const countPipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "models",
        localField: "modelName",
        foreignField: "_id",
        as: "modelName",
      },
    },
    { $unwind: "$modelName" },
    {
      $match: {
        $or: [
          { imeiNo: { $regex: search, $options: "i" } },
          { "modelName.modelName": { $regex: search, $options: "i" } },
        ],
      },
    },
    { $count: "total" },
  ];

  const countResult = await mongoose.model("Stock").aggregate(countPipeline);
  const totalCount = countResult[0]?.total || 0;

  return { totalCount, items: data };
};

exports.getStockService = async (stockId) => {
  const stockData = await Stock.findById(stockId)
    .populate(
      "organization branch customerName categoryName modelName deviceName capacityName color"
    )
    .lean();
  return stockData;
};

exports.createStockService = async (newStock) => {
  const { payment } = newStock;
  // console.log(payment);

  payment.forEach(
    async (item) =>
      await Account.findByIdAndUpdate(
        item.paymentAccount,
        {
          $inc: { balance: -item.paymentAmount },
        },
        { new: true }
      )
  );

  const stockData = await Stock.create(newStock);

  return stockData;
};

exports.updateStockService = async (stockId, stock) => {
  const deviceData = stock && stock.device && stock.device[0];

  const imeiData = deviceData && deviceData.imei[0];

  const data = await Stock.findByIdAndUpdate(
    stockId,
    {
      organization: stock?.organization || null,
      branch: stock?.branch || null,
      customerName: stock?.customerName || null,
      customerPhone: stock?.customerPhone || null,

      categoryName: deviceData?.categoryName || null,
      modelName: deviceData?.modelName || null,
      capacityName: deviceData?.capacityName || null,
      color: deviceData?.color || null,
      deviceName: deviceData?.deviceName || null,

      imeiNo: imeiData?.imeiNo || null,
      srNo: imeiData?.srNo || null,
      totalAmount: imeiData?.totalAmount || null,
      paidToCustomer: imeiData?.paidToCustomer || null,
      remainingAmount: imeiData?.remainingAmount || null,

      payment: stock?.payment || null,
    },
    { new: true }
  );

  return data;
};

exports.softDeleteStockService = async (stockId) => {
  return await Stock.findByIdAndUpdate(stockId, { isDeleted: true });
};

exports.deleteStockService = async (stockId) => {
  return await Stock.findByIdAndDelete(stockId);
};

// exports.searchStockService = async (orgText) => {
//   let findObject = { isDeleted: false };

//   if (orgText.trim() !== "") {
//     findObject.$or = [{ customer: { $regex: `^${orgText}`, $options: "i" } }];
//   }

//   return await Model.find(findObject).limit(5); // Increase limit if needed
// };

exports.getStockByOrgAndCusService = async (orgId, cusId) => {
  const stockData = await Stock.find({
    organization: orgId,
    customerName: cusId,
    isDeleted: false,
  })
    .populate("customerName deviceName")
    .lean();

  console.log(stockData);

  return stockData;
};
