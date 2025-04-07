const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    branchName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganizationBranch",
    },
    date: { type: Date, require: true },
    amount: { type: Number, require: true },
    category: {
      type: String,
      enum: ["Buy", "Sell", "Exchange", "Repair"],
      require: true,
    },
    description: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
