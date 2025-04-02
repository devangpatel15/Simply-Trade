const Stock = require("../models/stock");

exports.getAllStockService = async (userOrgId,role,userId) => {

  const data = await Stock.find({ isDeleted: false })
    .populate({
      path: "organization",
      match:  role=="user" ? {_id:userOrgId}:{userId:userId} ,
    })
    .populate(
      "branch customerName categoryName modelName deviceName capacityName color"
    )
    .lean();
    return data
};

exports.getStockService = async (stockId) => {
  return await Stock.findById(stockId)
    .populate(
      "organization branch customerName categoryName modelName deviceName capacityName color"
    )
    .lean();
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
