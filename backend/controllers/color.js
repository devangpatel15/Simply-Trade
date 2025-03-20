const {
  findOneColorServices,
  findAllColorServices,
  createColorServices,
  updateColorServices,
  deleteColorServices,
  findUserColorServices,
  softDeleteColorService,
  selectColorByDeviceServices,
  searchColorServices,
} = require("../services/color");

exports.findAllColor = async (req, res) => {
  try {
    const colorData = await findAllColorServices();

    if (!colorData) {
      return res.status(404).json({ message: "No Color found" });
    }

    return res.status(200).json({
      message: "Color retrieved successfully",
      data: colorData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.findOneColor = async (req, res) => {
  try {
    const colorId = req.params.id;
    const colorData = await findOneColorServices(colorId);

    if (!colorData) {
      return res.status(404).json({ message: "No Color found" });
    }

    return res.status(200).json({
      message: "Color retrieved successfully",
      data: colorData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
exports.selectColorByDevice = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const colorData = await selectColorByDeviceServices(deviceId);

    if (!colorData) {
      return res.status(404).json({ message: "No Color found" });
    }

    return res.status(200).json({
      message: "Color retrieved successfully",
      data: colorData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.findUserColor = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const colorData = await findUserColorServices(userId);

    if (!colorData) {
      return res.status(404).json({ message: "No Color found" });
    }

    return res.status(200).json({
      message: "Color retrieved successfully",
      data: colorData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.createColor = async (req, res) => {
  try {
    const data = req.body;
    const colorData = await createColorServices({
      ...data,
      userId: req.user.id,
    });
    return res.status(200).json({ message: "Color created", data: colorData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updateColor = async (req, res) => {
  try {
    const colorId = req.params.id;

    const data = req.body;
    const colorData = await updateColorServices(colorId, data);
    if (!colorData) {
      return res.status(404).json({ message: "Color not found" });
    }

    return res.status(200).json({ message: "Color updated", data: colorData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeleteColor = async (req, res) => {
  try {
    const colorId = req.params.id;
    const color = await softDeleteColorService(colorId);
    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }

    return res
      .status(200)
      .json({ message: "Color soft deleted", data: color });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    const colorId = req.params.id;
    const colorData = await deleteColorServices(colorId);
    if (!colorData) {
      return res.status(404).json({ message: "Color not found" });
    }
    return res.status(200).json({ message: "Color deleted", data: colorData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.searchColor = async (req, res) => {
  try {
    const orgText = req.query.text || "";

    const org = await searchColorServices(orgText);

    if (!org) {
      return res.status(404).json({ message: "searchColor not found" });
    }
    return res
      .status(200)
      .json({ message: "searchColor searched successfully", data: org });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};