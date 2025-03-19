const Stock = require('../models/stock');

exports.getAllStockService = async () => {
  return await Stock.find({ isDeleted: false }).lean();
};

exports.getStockService = async (stockId) => {
  return await Stock.findById(stockId ).lean();
};

exports.createStockService = async (newStock) => {
  return await Stock.create(newStock)
};

exports.updateStockService = async (stockId, stock) => {
  return await Stock.findByIdAndUpdate(stockId, stock,{new:true}).lean();
};

exports.softDeleteStockService = async (stockId) => {
  return await Stock.findByIdAndUpdate(stockId, { isDeleted: true });
};


exports.deleteStockService = async (stockId) => {
  return await Stock.findByIdAndDelete(stockId);
};