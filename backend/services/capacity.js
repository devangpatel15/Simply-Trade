const Capacity = require("../models/capacity");

exports.getAllCapacityService = async () => {
  return await Capacity.find({ isDeleted: false }).lean();
};

exports.getCapacityService = async (capId) => {
  return await Capacity.findById(capId)
    .populate("organization branchName categoryId modelId deviceId")
    .lean();
};
exports.selectCapacityByDeviceService = async (deviceId) => {
  return await Capacity.find({ deviceId, isDeleted: false }).lean();
};

exports.createCapacityService = async (newCap) => {
  return await Capacity.create(newCap);
};

exports.updateCapacityService = async (capId, cap) => {
  return await Capacity.findByIdAndUpdate(capId, cap, { new: true }).lean();
};

exports.softDeleteCapacityService = async (capId) => {
  return await Capacity.findByIdAndUpdate(capId, { isDeleted: true });
};

exports.deleteCapacityService = async (capId) => {
  return await Capacity.findByIdAndDelete(capId);
};

exports.searchCapacityService = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [
      { capacityName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  return await Capacity.find(findObject).limit(5); // Increase limit if needed
};
