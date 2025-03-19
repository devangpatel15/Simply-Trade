const Color = require("../models/color");

exports.findAllColorServices = async () => {
    const data = await Color.find({ isDeleted: false }).lean();

    return data;
};
exports.findOneColorServices = async (colorId) => {
    const data = await Color.findById({colorId , isDeleted: false }).lean();

    return data;
};
exports.selectColorByDeviceServices = async (deviceId) => {
    const data = await Color.findById({deviceId , isDeleted: false }).lean();

    return data;
};
exports.findUserColorServices = async (userId) => {
    const data = await Color.find().populate().lean();
    return data;
};

exports.createColorServices = async (colorData) => {
    const data = await Color.create(colorData);
    return data;
};

exports.updateColorServices = async (
    colorId,
    colorData
) => {
    const data = await Color.findByIdAndUpdate(
        colorId,
        colorData,
        { new: true }
    ).lean();
    return data;
};

exports.softDeleteColorService = async (colorId) => {
    return await Color.findByIdAndUpdate(colorId, { isDeleted: true });
  };
  

exports.deleteColorServices = async (colorId) => {
    const data = await Color.findByIdAndDelete(
        colorId
    ).lean();
    return data;
};
