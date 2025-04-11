const {
  getAllStockService,
  getStockService,
  createStockService,
  updateStockService,
  deleteStockService,
  softDeleteStockService,
} = require("../services/stock");

exports.getAllStock = async (req, res) => {
  try {
    const userOrgId = req.user.org;
    const role = req.user.role;
    const userId = req.user.id;
    const stock = await getAllStockService(userOrgId, role, userId, req);
    if (!stock) {
      return res.status(404).json({ message: "No Stock found" });
    }

    return res.status(200).json({
      message: "Stock retrieved successfully",
      data: stock,
    });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = await getStockService(stockId);
    if (!stock) {
      return res.status(404).json({ message: "No Stock found" });
    }

    return res.status(200).json({
      message: "Stock retrieved successfully",
      data: stock,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.createStock = async (req, res) => {
  try {
    const newStock = req.body;
    const { device } = newStock;

    // Validate request body
    if (!device || !Array.isArray(device) || device.length === 0) {
      return res.status(400).json({ message: "Invalid device data" });
    }

    const stockEntries = [];

    // Loop through device and imei
    device.forEach((deviceItem) => {
      if (deviceItem.imei && Array.isArray(deviceItem.imei)) {
        deviceItem.imei.forEach((imeiItem) => {
          // Create a stock entry for each imei
          const stockEntry = {
            organization: newStock.organization,
            branch: newStock.branch,
            customerName: newStock.customerName,
            customerPhone: newStock.customerPhone,
            categoryName: deviceItem.categoryName,
            modelName: deviceItem.modelName,
            deviceName: deviceItem.deviceName,
            capacityName: deviceItem.capacityName,
            color: deviceItem.color,
            imeiNo: imeiItem.imeiNo,
            srNo: imeiItem.srNo,
            totalAmount: imeiItem.totalAmount,
            paidToCustomer: imeiItem.paidToCustomer,
            remainingAmount: imeiItem.remainingAmount,
            upload: newStock.upload,
          };
          stockEntries.push(stockEntry);
        });
      }
    });

    // Save all stock entries to the database
    const createdStocks = await Promise.all(
      stockEntries.map((entry) => createStockService(entry))
    );

    return res
      .status(200)
      .json({ message: "Stocks created", data: createdStocks });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// exports.createStock = async (req, res) => {
//   try {
//     const newStock = req.body;
//     const {deviceData}=newStock;
//     const{ imeiFormData}=deviceData;

//     // const stock={
//     //   organization:"",
//     //   branch:"",
//     //   customerName:"",
//     //   customerPhone:"",
//     //   deviceData:[
//     //     {
//     //       categoryName:"",
//     //       modelName:"",
//     //       deviceName:"",
//     //       capacityName:"",
//     //       color:"",
//     //       imeiFormData:[
//     //         {
//     //           imeiNo:"",
//     //           totalAmount:"",
//     //           paidToCustomer:"",
//     //           remainingAmount:"",
//     //         }
//     //       ]
//     //     }
//     //   ]
//     // };

//     // deviceData.map((device) => {
//     //   return device.imeiFormData.map((imei) => {
//     //     return console.log(imei);
//     //   });
//     // });

//     const createdStock = await createStockService(newStock);

//     return res
//       .status(200)
//       .json({ message: "Stock created", data: createdStock });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: err.message });
//   }
// };

exports.updateStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = req.body;

    console.log(stock, "stock");
    const updatedStock = await updateStockService(stockId, stock);
    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    return res
      .status(200)
      .json({ message: "Stock updated", data: updatedStock });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeleteStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = await softDeleteStockService(stockId);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    return res.status(200).json({ message: "Stock soft deleted", data: stock });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = await deleteStockService(stockId);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    return res.status(200).json({ message: "Stock deleted", data: stock });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
