const Expense = require("../models/expense");
const Stock = require("../models/stock");

exports.getAllExpenseService = async (userOrgId, role, userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const items = await Expense.find({
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

  // console.log(items, "items");

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
  const updatedStock = await Stock.findByIdAndUpdate(
    stock,
    { expenseAmount: amount },
    {
      new: true,
    }
  ).lean();

  console.log("updatedStock", updatedStock);
  console.log("stock", stock);
  console.log("amount", amount);  
  
  const updatedExpense = await Expense.findByIdAndUpdate(exId, ex, {
    new: true,
  }).lean();

  console.log("updatedExpense", updatedExpense);

  console.log("exx", ex);


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
exports.getExpenseByDateService = async ({ startDate, endDate }) => {
  const filter = { isDeleted: false };

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include full end day

    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid date format");
    }

    // 👇 Use "date" if you're explicitly storing it, otherwise use "createdAt"
    filter.date = {
      $gte: start,
      $lte: end,
    };

    const result = await Expense.find(filter).populate("organization branchName modelName deviceName").lean();

    // console.log("📅 Filtered by date:", {
    //   $gte: start.toISOString(),
    //   $lte: end.toISOString(),
    // });
    // console.log("📅 Matched count:", result.length);

    return result;
  } catch (err) {
    console.error("❌ Error in getExpenseByDateService:", err.message);
    throw err;
  }
};

