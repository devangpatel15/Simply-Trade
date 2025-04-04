const Customer = require("../models/customer");

exports.getAllCustomerService = async (userId, role, userBranchId) => {
  const data= await Customer.find({
    isDeleted: false,
  })
    .populate({
      path: role == "user" ? "branchName" : "organization",
      match: role == "user" ? { _id: userBranchId } : { userId: userId },
    }).populate("organization branchName")
    .lean();

    return data.filter((item)=>{return item.branchName!=null})
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

  if (orgText && orgText.trim() !== "") {
    findObject.$or = [
      { customerName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  if (branchId) {
    findObject.branchName = branchId;
  }

  return await Customer.find(findObject)
    .populate("branchName organization")
    .limit(5)
    .lean();
};
