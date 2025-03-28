const Device = require("../models/device");

exports.findAllDeviceServices = async () => {
    const data = await Device.find({ isDeleted: false }).populate("organization branchName categoryId modelId").lean();

    return data;
};
exports.findOneDeviceServices = async (deviceId) => {
    const data = await Device.findById(deviceId).populate("organization branchName categoryId modelId").lean();

    return data;
};
exports.selectDeviceByModelServices = async (modelId) => {
    const data = await Device.find({modelId , isDeleted: false}).lean();

    return data;
};
exports.findUserDeviceServices = async (userId) => {
    const data = await Device.find().populate().lean();
    return data;
};

exports.createDeviceServices = async (deviceData) => {
    const data = await Device.create(deviceData);
    return data;
};

exports.updateDeviceServices = async (
    deviceId,
    deviceData
) => {
    const data = await Device.findByIdAndUpdate(
        deviceId,
        deviceData,
        { new: true }
    ).lean();
    return data;
};

exports.softDeleteDeviceService = async (deviceId) => {
    return await Device.findByIdAndUpdate(deviceId, { isDeleted: true });
  };
  

exports.deleteDeviceServices = async (deviceId) => {
    const data = await Device.findByIdAndDelete(
        deviceId
    ).lean();
    return data;
};

exports.searchDeviceService = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [
      { deviceName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  return await Device.find(findObject).limit(5); // Increase limit if needed
};

