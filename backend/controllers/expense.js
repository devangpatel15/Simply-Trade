const {
  getAllExpenseService,
  getExpenseService,
  createExpenseService,
  updateExpenseService,
  softDeleteExpenseService,
} = require("../services/expense");
const moment = require("moment");

exports.getAllExpense = async (req, res) => {
  try {
    const ex = await getAllExpenseService(req);
    if (!ex) {
      return res.status(404).json({ message: "No Expense found" });
    }
    return res.status(200).json({
      message: "Expense retrieved successfully",
      data: ex,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const exId = req.params.id;
    const ex = await getExpenseService(exId);
    if (!ex) {
      return res.status(404).json({ message: "No Expense found" });
    }
    return res.status(200).json({
      message: "Expense retrieved successfully",
      data: ex,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const newEx = req.body;

    // Convert date to JavaScript Date using moment
    if (newEx.date) {
      newEx.date = moment(newEx.date).toDate(); // ensure proper Date object
    }

    const createdEx = await createExpenseService(newEx);
    return res.status(200).json({ message: "Expense added", data: createdEx });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const exId = req.params.id;
    const ex = req.body;
    const updatedEx = await updateExpenseService(exId, ex);
    if (!updatedEx) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res
      .status(200)
      .json({ message: "Expense updated", data: updatedEx });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.softDeleteExpense = async (req, res) => {
  try {
    const exId = req.params.id;
    const ex = await softDeleteExpenseService(exId);
    if (!ex) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense soft deleted", data: ex });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
