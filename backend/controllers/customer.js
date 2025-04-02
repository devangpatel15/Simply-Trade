const {
  getAllCustomerService,
  getCustomerService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
  softDeleteCustomerService,
  searchCustomerServices,
  selectCustomerServices,
} = require("../services/customer");

exports.getAllCustomer = async (req, res) => {
  try {
    const userId=req.user.id
    const cus = await getAllCustomerService(userId);
    if (!cus) {
      return res.status(404).json({ message: "No Customer found" });
    }
    return res.status(200).json({
      message: "Customer retrieved successfully",
      data: cus
    });
  } catch (err) {
    return res
      .status(500)
      
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const cusId = req.params.id;
    const cus = await getCustomerService(cusId);
    if (!cus) {
      return res.status(404).json({ message: "No Customer found" });
    }
    return res.status(200).json({
      message: "Customer retrieved successfully",
      data: cus,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const newCus = req.body;
    const createdCus = await createCustomerService(newCus);
    return res
      .status(200)
      .json({ message: "Customer added", data: createdCus });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const cusId = req.params.id;
    const cus = req.body;
    const updatedCus = await updateCustomerService(cusId, cus);
    if (!updatedCus) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res
      .status(200)
      .json({ message: "Customer updated", data: updatedCus });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeleteCustomer = async (req, res) => {
  try {
    const cusId = req.params.id;
    const cus = await softDeleteCustomerService(cusId);
    if (!cus) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res
      .status(200)
      .json({ message: "Customer soft deleted", data: cus });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const cusId = req.params.id;
    const cus = await deleteCustomerService(cusId);
    if (!cus) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deleted", data: cus });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// exports.searchCustomer = async (req, res) => {

//   try {
//     const orgText = req.query.text || "";

//     const org = await searchCustomerServices(orgText);

//     if (!org) {
//       return res.status(404).json({ message: "searchCustomer not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "searchCustomer searched successfully", data: org });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: err.message });
//   }
// };

// exports.selectCustomer = async (req, res) => {
//   try {
//     // const orgId = req?.query?.id;
//     const branchId = req?.params?.id;
//     // const text = req.query.text || "";
//     const customerData = await selectCustomerServices(
//       branchId
//     );

//     if (!customerData) {
//       return res.status(404).json({ message: "No customerData found" });
//     }

//     return res.status(200).json({
//       message: "customerData retrieved successfully",
//       data: customerData,
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: err.message });
//   }
// };

exports.selectCustomer = async (req, res) => {
  try {
    const branchId = req?.params?.id;
    const orgText = req?.query?.text || "";

    if (!branchId && !orgText) {
      return res.status(400).json({
        message: "Please provide either branchId or orgText for filtering.",
      });
    }

    const customerData = await selectCustomerServices(branchId, orgText);

    if (!customerData || customerData.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    return res.status(200).json({
      message: "Customer data retrieved successfully",
      data: customerData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
