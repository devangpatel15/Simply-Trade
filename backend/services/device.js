const Device = require("../models/device");

exports.findAllDeviceServices = async () => {
    const data = await Device.find().lean();

    return data;
};
exports.findOneDeviceServices = async (deviceId) => {
    const data = await Device.findById(deviceId).lean();

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

exports.deleteDeviceServices = async (deviceId) => {
    const data = await Device.findByIdAndDelete(
        deviceId
    ).lean();
    return data;
};
