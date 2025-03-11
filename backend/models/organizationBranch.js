const mongoose = require("mongoose");

const organizationBranchSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Organization",
    },
    branchName: { type: String, require: true },
    primaryAddress: { type: String, require: true },
    addressLine1: { type: String, require: true },
    addressLine2: { type: String },
    city: { type: String, require: true },
    district: { type: String, require: true },
    state: { type: String, require: true },
    zipCode: { type: String, require: true },
    country: { type: String, require: true },
    telePhone: { type: String, require: true },
    mobile: { type: String, require: true },
    email: { type: String, require: true },
    companyType: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrganizationBranch", organizationBranchSchema);
