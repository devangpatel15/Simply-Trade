const Color = require("../models/color");
const { populate } = require("../models/device");

exports.findAllColorServices = async () => {
    const data = await Color.find({ isDeleted: false }).lean();

    return data;
};
exports.findOneColorServices = async (colorId) => {
    const data = await Color.findById(colorId).populate("categoryId modelId deviceId organization branchName").lean();

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

exports.searchColorServices = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [
      { colorName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  return await Color.find(findObject).limit(5); // Increase limit if needed
};
