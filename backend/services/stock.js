const Stock = require("../models/stock");

exports.getAllStockService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const data = await Stock.find({ isDeleted: false, isSelled: false })
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
  const filterData = data.filter((item) => {
    return item.organization != null;
  });

  const totalCount = await Stock.countDocuments({
    isDeleted: false,
    isSelled: false,
  });

  return { totalCount, items: filterData };
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
  return await Stock.create(newStock);
};

exports.updateStockService = async (stockId, stock) => {
  console.log(stock, "stock----");

  const data = await Stock.findByIdAndUpdate(stockId, stock, { new: true })
    .populate(
      "organization branch customerName categoryName modelName deviceName capacityName color"
    )
    .lean();
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
