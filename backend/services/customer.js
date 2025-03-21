const Customer = require("../models/customer");

exports.getAllCustomerService = async () => {
  return await Customer.find({ isDeleted: false }).lean();
};

exports.getCustomerService = async (cusId) => {
  return await Customer.findById(cusId ).populate("organization branchName").lean();
};

exports.createCustomerService = async (newCus) => {
  return await Customer.create(newCus)
};

exports.updateCustomerService = async (cusId, cus) => {
  return await Customer.findByIdAndUpdate(cusId, cus,{new:true}).lean();
};
exports.softDeleteCustomerService = async (cusId) => {
  return await Customer.findByIdAndUpdate(cusId, { isDeleted: true });
};


exports.deleteCustomerService = async (cusId) => {
  return await Customer.findByIdAndDelete(cusId).lean();
};

exports.searchCustomerServices = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [
      { customerName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  return await Customer.find(findObject).limit(5); // Increase limit if needed
};

