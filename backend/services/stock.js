const Stock = require("../models/stock");

exports.getAllStockService = async () => {
  return await Stock.find({ isDeleted: false }).populate("organization branch customer categoryName modelName deviceName capacityName color").lean();
};

exports.getStockService = async (stockId) => {
  return await Stock.findById(stockId).populate("organization branch customer categoryName modelName deviceName capacityName color").lean();
};

exports.createStockService = async (newStock) => {
  return await Stock.create(newStock);
};

exports.updateStockService = async (stockId, stock) => {
  return await Stock.findByIdAndUpdate(stockId, stock, { new: true }).lean();
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
