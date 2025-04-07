const Device = require("../models/device");

exports.findAllDeviceServices = async (userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const items = await Device.find({ isDeleted: false })
    .populate({
      path: "organization",
      match: { userId: userId },
    })
    .populate("branchName categoryId modelId")
    .lean()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Device.countDocuments();

  return { totalCount, items };
};
exports.findOneDeviceServices = async (deviceId) => {
  const data = await Device.findById(deviceId)
    .populate("organization branchName categoryId modelId")
    .lean();

  return data;
};
exports.selectDeviceByModelServices = async (modelId, orgText) => {
  // const data = await Device.find({modelId , isDeleted: false}).lean();

  let findObject = { isDeleted: false };

  if (orgText && orgText.trim() !== "") {
    findObject.$or = [{ deviceName: { $regex: `^${orgText}`, $options: "i" } }];
  }

  if (modelId) {
    findObject.modelId = modelId;
  }

  return await Device.find(findObject)
    .populate("categoryId modelId organization branchName")
    .limit(5)
    .lean();
};
exports.findUserDeviceServices = async (userId) => {
  const data = await Device.find().populate().lean();
  return data;
};

exports.createDeviceServices = async (deviceData) => {
  const data = await Device.create(deviceData);
  return data;
};

exports.updateDeviceServices = async (deviceId, deviceData) => {
  const data = await Device.findByIdAndUpdate(deviceId, deviceData, {
    new: true,
  }).lean();
  return data;
};

exports.softDeleteDeviceService = async (deviceId) => {
  return await Device.findByIdAndUpdate(deviceId, { isDeleted: true });
};

exports.deleteDeviceServices = async (deviceId) => {
  const data = await Device.findByIdAndDelete(deviceId).lean();
  return data;
};

// exports.searchDeviceService = async (orgText) => {
//   let findObject = { isDeleted: false };

//   if (orgText.trim() !== "") {
//     findObject.$or = [
//       { deviceName: { $regex: `^${orgText}`, $options: "i" } },
//     ];
//   }

//   return await Device.find(findObject).limit(5); // Increase limit if needed
// };
