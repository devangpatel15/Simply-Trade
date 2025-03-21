const Model = require("../models/model");

exports.findAllModelServices = async () => {
  const data = await Model.find({ isDeleted: false }).lean();

  return data;
};
exports.findOneModelServices = async (modelId) => {
  const data = await Model.findById(modelId)
    .populate("categoryId organization branchName")
    .lean();

  return data;
};
exports.selectModelByCatServices = async (catId) => {
  const data = await Model.find({ categoryId: catId, isDeleted: false }).lean();

  return data;
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

exports.searchModelService = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [{ modelName: { $regex: `^${orgText}`, $options: "i" } }];
  }

  return await Model.find(findObject).limit(5); // Increase limit if needed
};
