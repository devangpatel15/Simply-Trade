const {
  getAllSellService,
  getSellService,
  createSellService,
  updateSellService,
  softDeleteSellService,
  deleteSellService,
  getAllStockSellRepairService,
} = require("../services/sell");

exports.getAllSell = async (req, res) => {
  try {
    const userOrgId = req.user.org;
    const role = req.user.role;
    const userId = req.user.id;
    const sell = await getAllSellService(userOrgId, role, userId, req);
    if (!sell) {
      return res.status(404).json({ message: "No sell found" });
    }

    return res.status(200).json({
      message: "Sell retrieved successfully",
      data: sell,
    });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getSell = async (req, res) => {
  try {
    const sellId = req.params.id;
    const sell = await getSellService(sellId);
    if (!sell) {
      return res.status(404).json({ message: "No sell found" });
    }

    return res.status(200).json({
      message: "Sell retrieved successfully",
      data: sell,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.createSell = async (req, res) => {
  try {
    const newSell = req.body;
    const { device, stock } = newSell;

    // Validate request body
    if (!device || !Array.isArray(device) || device.length === 0) {
      return res.status(400).json({ message: "Invalid device data" });
    }

    const sellEntries = [];

    device.forEach((deviceItem) => {
      const sellEntry = {
        organization: newSell.organization,
        branch: newSell.branch,
        customerName: newSell.customerName,
        customerPhone: newSell.customerPhone,
        stock: newSell.stock,
        modelName: deviceItem.modelName,
        deviceName: deviceItem.deviceName,
        amount: deviceItem.amount,
        customerPaid: deviceItem.customerPaid,
        remainingAmount: deviceItem.remainingAmount,
        upload: deviceItem.upload,
      };
      sellEntries.push(sellEntry);
    });

    // Save all sell entries to the database
    const createdSells = await Promise.all(
      sellEntries.map((entry) => createSellService(entry, stock))
    );

    return res
      .status(200)
      .json({ message: "Sell created", data: createdSells });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updateSell = async (req, res) => {
  try {
    const sellId = req.params.id;
    const updateData = req.body;

    if (updateData.device && !Array.isArray(updateData.device)) {
      return res.status(400).json({ message: "Invalid device data" });
    }

    const updatedSell = await updateSellService(sellId, updateData);
    if (!updatedSell) {
      return res.status(404).json({ message: "Sell not found" });
    }
    return res.status(200).json({ message: "Sell updated", data: updatedSell });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeleteSell = async (req, res) => {
  try {
    const sellId = req.params.id;
    const sell = await softDeleteSellService(sellId);
    if (!sell) {
      return res.status(404).json({ message: "Sell not found" });
    }

    return res.status(200).json({ message: "Sell soft deleted", data: sell });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteSell = async (req, res) => {
  try {
    const sellId = req.params.id;
    const sell = await deleteSellService(sellId);
    if (!sell) {
      return res.status(404).json({ message: "Sell not found" });
    }
    return res.status(200).json({ message: "Sell deleted", data: sell });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getAllStockSellRepair = async (req, res) => {
  try {
    const userOrgId = req.user?.org;
    const role = req.user?.role;
    const userId = req.user?.id;
    const allData = await getAllStockSellRepairService(
      userOrgId,
      role,
      userId,
      req
    );
    if (!allData) {
      return res.status(404).json({ message: "No Data found" });
    }

    return res.status(200).json({
      message: "Data retrieved successfully",
      data: allData,
    });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
