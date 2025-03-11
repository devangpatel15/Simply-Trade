const Category = require("../models/category");

exports.getAllCategoryService = async () => {
  return await Category.find().lean();
};

exports.getCategoryService = async (catId) => {
  return await Category.findById(catId).lean();
};

exports.createCategoryService = async (newCat) => {
  return await Category.create(newCat)
};

exports.updateCategoryService = async (catId, cat) => {
  return await Category.findByIdAndUpdate(catId, cat,{new:true}).lean();
};

exports.deleteCategoryService = async (catId) => {
  return await Category.findByIdAndDelete(catId);
};
