const { default: mongoose } = require("mongoose");
const Expense = require("../models/expense");
const Stock = require("../models/stock");

exports.getAllExpenseService = async (
  userOrgId,
  userBranchId,
  role,
  userId,
  req
) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    isDeleted: false,
    ...(role === "user" && { branchName: userBranchId }),
    // you can add more conditions here if needed for other roles
  };

  const items = await Expense.find(filter)
    // .populate({
    //   path: "branchName",
    //   match: role === "user" ? { _id: userBranchId } : { userId: userId },
    // })
    .populate("organization branchName category stock modelName deviceName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Expense.countDocuments(filter);

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

exports.createExpenseService = async (
  newEx,
  stock,
  amount,
  date,
  description
) => {
  // console.log(stock);
  const createExpense = await Expense.create(newEx);
  const updateStock = await Stock.findByIdAndUpdate(
    stock,
    {
      expense: createExpense._id,
      expenseAmount: amount,
      expenseDate: date,
      expenseDescription: description,
    },
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

  // console.log("exx", ex);

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
exports.getExpenseByDateService = async ({ startDate, endDate }, branchId) => {
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
    if (branchId) {
      filter.branchName = new mongoose.Types.ObjectId(branchId);
    }

    const result = await Expense.find(filter)
      .populate("organization branchName modelName deviceName")
      .lean();

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
