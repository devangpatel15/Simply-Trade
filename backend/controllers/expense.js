const {
  getAllExpenseService,
  getExpenseService,
  createExpenseService,
  updateExpenseService,
  softDeleteExpenseService,
  getExpenseByDateService,
} = require("../services/expense");

exports.getAllExpense = async (req, res) => {
  console.log(req.user, "req.user");

  try {
    const userOrgId = req.user.org;
    const role = req.user.role;
    const userId = req.user.id;
    const ex = await getAllExpenseService(userOrgId, role, userId, req);
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
    const { stock, amount, description, date } = newEx;
    const createdEx = await createExpenseService(
      newEx,
      stock,
      amount,
      date,
      description
    );
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
    const { stock, amount } = req.body;
    const ex = req.body;

    const updatedEx = await updateExpenseService(exId, ex, stock, amount);
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

exports.getExpenseByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // console.log("📥 Received from client:", req.query);

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required.",
      });
    }

    const expenses = await getExpenseByDateService({ startDate, endDate });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error("❌ Error in getExpenseByDate:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching expenses.",
    });
  }
};
