const Sell = require("../models/sell");

exports.getAllSellService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const data = await Sell.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: role == "user" ? { _id: userOrgId } : { userId: userId },
    })
    .populate("branch customerName modelName deviceName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  const filterData = data.filter((item) => {
    return item.organization != null;
  });

  console.log("data", filterData);

  const totalCount = await Sell.countDocuments({
    isDeleted: false,
  });

  return { totalCount, items: filterData };
};

exports.getSellService = async (sellId) => {
  const stockData = await Sell.findById(sellId)
    .populate("branch customerName modelName deviceName")
    .lean();
  return sellData;
};

exports.createSellService = async (newSell) => {
  return await Sell.create(newSell);
};

exports.updateSellService = async (sellId, sell) => {
  const data = await Sell.findByIdAndUpdate(sellId, sell, { new: true })
    .populate("branch customerName modelName deviceName")
    .lean();
  return data;
};

exports.softDeleteSellService = async (sellId) => {
  return await Sell.findByIdAndUpdate(sellId, { isDeleted: true });
};

exports.deleteSellService = async (sellId) => {
  return await Sell.findByIdAndDelete(sellId);
};
