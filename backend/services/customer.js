const Customer = require("../models/customer");

exports.getAllCustomerService = async () => {
  return await Customer.find({ isDeleted: false })
    .populate("organization branchName")
    .lean();
};

exports.getCustomerService = async (cusId) => {
  return await Customer.findById(cusId)
    .populate("organization branchName")
    .lean();
};

exports.createCustomerService = async (newCus) => {
  return await Customer.create(newCus);
};

exports.updateCustomerService = async (cusId, cus) => {
  return await Customer.findByIdAndUpdate(cusId, cus, { new: true }).lean();
};
exports.softDeleteCustomerService = async (cusId) => {
  return await Customer.findByIdAndUpdate(cusId, { isDeleted: true });
};

exports.deleteCustomerService = async (cusId) => {
  return await Customer.findByIdAndDelete(cusId).lean();
};

// exports.searchCustomerServices = async (orgText) => {
//   let findObject = { isDeleted: false };

//   if (orgText.trim() !== "") {
//     findObject.$or = [
//       { customerName: { $regex: `^${orgText}`, $options: "i" } },
//     ];
//   }

//   return await Customer.find(findObject).limit(5); // Increase limit if needed
// };

// exports.selectCustomerServices = async (branchId) => {
//   const data = await Customer.find({
//     branchName: branchId,
//     isDeleted: false,
//   })
//     .populate("branchName organization")
//     .lean();
//   return data;
// };

exports.selectCustomerServices = async (branchId, orgText) => {
  let findObject = { isDeleted: false };

  // If orgText is provided, filter customers based on the search term (starts with match, case-insensitive)
  if (orgText && orgText.trim() !== "") {
    findObject.$or = [
      { customerName: { $regex: `^${orgText}`, $options: "i" } }, // Case-insensitive search for customer names starting with orgText
    ];
  }

  if (branchId) {
    findObject.branchName = branchId;
  }

  // Fetch all matching records based on the search criteria, no limit here
  const data = await Customer.find(findObject)
    .populate("branchName organization")
    .lean();

  // Limit the number of results to 5 for the dropdown, even after filtering
  const limitedData = data.slice(0, 5);

  return limitedData;
};

