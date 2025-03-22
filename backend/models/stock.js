const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrganizationBranch",
    required: true,
  },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  categoryName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  modelName: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
  deviceName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  capacityName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Capacity",
    required: true,
  },
  color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
  imeiNo: { type: String },
  srNo: { type: String },
  totalAmount: { type: Number, required: true },
  paidToCustomer: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  // upload : { type: String, required: true },
});

module.exports = mongoose.model("Stock", stockSchema);
