const Category = require("../models/category");

exports.getAllCategoryService = async () => {
  return await Category.find({ isDeleted: false }).lean();
};

exports.getCategoryService = async (catId) => {
  return await Category.findById(catId).lean();
};

exports.selectCategoryByBranchService = async (branchId) => {
  return await Category.find({orgBranchId:branchId, isDeleted: false }).lean();
};

exports.createCategoryService = async (newCat) => {
  return await Category.create(newCat)
};

exports.updateCategoryService = async (catId, cat) => {
  return await Category.findByIdAndUpdate(catId, cat,{new:true}).lean();
};

exports.softDeleteCategoryService = async (catId) => {
  return await Category.findByIdAndUpdate(catId, { isDeleted: true });
};

exports.deleteCategoryService = async (catId) => {
  return await Category.findByIdAndDelete(catId);
};
