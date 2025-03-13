const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, require: true },
    primaryAddress: { type: String, require: true },
    addressLine1: { type: String, require: true },
    addressLine2: { type: String },
    city: { type: String, require: true },
    district: { type: String, require: true },
    state: { type: String, require: true },
    zipCode: { type: String, require: true },
    country: { type: String, require: true },
    telePhone: { type: String, require: true },
    email: { type: String, require: true },
    upload: { type: String },
    gstApplicable: { type: String, enum: ["yes", "no"], require: true },
    gstNumber: { type: String },
    gstType: { type: String, enum: ["regular", "composite"] },
    companyType: { type: String, require: true },
    dealingCurrency: { type: String, require: true},
    financialYear: { type: String, require: true },
    defaultStockMethod: { type: String, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
