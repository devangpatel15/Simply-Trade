const Expense = require("../models/expense");
const Stock = require("../models/stock");

exports.getAllExpenseService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const items = await Expense.find({
    organization: userOrgId,
    isDeleted: false,
  })
    .populate({
      path: "organization",
      match: role == "user" ? { _id: userOrgId } : { userId: userId },
    })
    .lean()
    .sort({ createdAt: -1 })
    .populate("organization branchName category stock modelName deviceName")
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Expense.countDocuments({ isDeleted: false });

  console.log(items, "items");

  return { totalCount, items };
};

exports.getExpenseService = async (exId) => {
  return await Expense.findById(exId)
    .populate("organization branchName category stock modelName deviceName")
    .lean();
};
// exports.selectExpenseByDeviceService = async (deviceId) => {
//   return await Expense.find({ deviceId, isDeleted: false }).lean();
// };

exports.createExpenseService = async (newEx, stock, amount) => {
  console.log(stock);
  const createExpense = await Expense.create(newEx);
  const updateStock = await Stock.findByIdAndUpdate(
    stock,
    { expenseAmount: amount },
    {
      new: true,
    }
  );

  return { createExpense, updateStock };
};

exports.updateExpenseService = async (exId, ex, stock, amount) => {
  const updatedExpense = await Expense.findByIdAndUpdate(exId, ex, {
    new: true,
  }).lean();

  console.log("exx", ex);

  const updatedStock = await Stock.findByIdAndUpdate(
    stock,
    { expenseAmount: amount },
    {
      new: true,
    }
  ).lean();

  return { updatedExpense, updatedStock };
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
