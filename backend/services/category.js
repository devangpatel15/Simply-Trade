const Category = require("../models/category");

exports.getAllCategoryService = async () => {
  return await Category.find({ isDeleted: false }).populate("orgId orgBranchId").lean();
};

exports.getCategoryService = async (catId) => {
  return await Category.findById(catId).populate("orgId orgBranchId").lean();
};
// FIXME:
exports.getUserCategoryService = async (userId) => {
  return await Category.find({isDeleted: false,orgId:userId}).populate("orgId orgBranchId").lean();
};


exports.createCategoryService = async (newCat) => {
  return await Category.create(newCat);
};

exports.updateCategoryService = async (catId, cat) => {
  return await Category.findByIdAndUpdate(catId, cat, { new: true }).lean();
};

exports.softDeleteCategoryService = async (catId) => {
  return await Category.findByIdAndUpdate(catId, { isDeleted: true });
};

exports.deleteCategoryService = async (catId) => {
  return await Category.findByIdAndDelete(catId);
};

// exports.searchCategoryService = async (orgText) => {
//   let findObject = { isDeleted: false };
  
//   if (orgText.trim() !== "") {
//     findObject.$or = [
//       { categoryName: { $regex: `^${orgText}`, $options: "i" } },
//     ];
//   }
  
//   return await Category.find(findObject).limit(5); // Increase limit if needed
  
// };
// exports.selectCategoryByBranchService = async (branchId) => {
//   return await Category.find({
//     orgBranchId: branchId,
//     isDeleted: false,
//   }).lean();
// };

exports.selectCategoryByBranchService = async (branchId, orgText) => {
  let findObject = { isDeleted: false };

  if (orgText && orgText.trim() !== "") {
    findObject.$or = [
      { categoryName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  if (branchId) {
    findObject.orgBranchId = branchId;
  }

  return await Category.find(findObject)
    .populate("orgId orgBranchId")
    .limit(5)
    .lean();
};  