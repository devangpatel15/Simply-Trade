const Expense = require("../models/expense");

exports.getAllExpenseService = async (req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const items = await Expense.find({ isDeleted: false })
    .lean()
    .sort({ createdAt: -1 })
    .populate("organization branchName category stock")
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Expense.countDocuments({ isDeleted: false });

  return { totalCount, items };
};

exports.getExpenseService = async (exId) => {
  return await Expense.findById(exId)
    .populate("organization branchName category stock")
    .lean();
};
// exports.selectExpenseByDeviceService = async (deviceId) => {
//   return await Expense.find({ deviceId, isDeleted: false }).lean();
// };

exports.createExpenseService = async (newEx) => {
  return await Expense.create(newEx);
};

exports.updateExpenseService = async (exId, ex) => {
  return await Expense.findByIdAndUpdate(exId, ex, { new: true }).lean();
};

exports.softDeleteExpenseService = async (exId) => {
  return await Expense.findByIdAndUpdate(exId, { isDeleted: true });
};

exports.deleteExpenseService = async (exId) => {
  return await Expense.findByIdAndDelete(exId);
};

// exports.searchExpenseService = async (orgText) => {
//   let findObject = { isDeleted: false };

//   if (orgText.trim() !== "") {
//     findObject.$or = [
//       { capacityName: { $regex: `^${orgText}`, $options: "i" } },
//     ];
//   }

//   return await Expense.find(findObject).limit(5); // Increase limit if needed
// };
