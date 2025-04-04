const Model = require("../models/model");

exports.findAllModelServices = async (userId) => {
  const data = await Model.find({ isDeleted: false })
    .populate({ path: "organization", match: { userId: userId } }).populate("branchName categoryId")
    .lean();

  return data;
};
exports.findOneModelServices = async (modelId) => {
  const data = await Model.findById(modelId)
    .populate("organization branchName categoryId")
    .lean();

  return data;
};
exports.selectModelByCatServices = async (catId, orgText) => {
  // const data = await Model.find({ categoryId: catId, isDeleted: false }).lean();
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [{ modelName: { $regex: `^${orgText}`, $options: "i" } }];
  }
  if (catId) {
    findObject.categoryId = catId;
  }

  return await Model.find(findObject)
    .populate("organization branchName categoryId")
    .limit(5); // Increase limit if needed
};
exports.findUserModelServices = async (userId) => {
  const data = await Model.find().populate().lean();
  return data;
};

exports.createModelServices = async (modelData) => {
  console.log("in servise::::::::::", modelData);
  const data = await Model.create(modelData);

  return data;
};

exports.updateModelServices = async (modelId, modelData) => {
  const data = await Model.findByIdAndUpdate(modelId, modelData, {
    new: true,
  }).lean();
  return data;
};

exports.softDeleteModelService = async (modelId) => {
  return await Model.findByIdAndUpdate(modelId, { isDeleted: true });
};

exports.deleteModelServices = async (modelId) => {
  const data = await Model.findByIdAndDelete(modelId).lean();
  return data;
};

// exports.searchModelService = async (orgText) => {
//   let findObject = { isDeleted: false };

//   if (orgText.trim() !== "") {
//     findObject.$or = [{ modelName: { $regex: `^${orgText}`, $options: "i" } }];
//   }

//   return await Model.find(findObject).limit(5); // Increase limit if needed
// };
