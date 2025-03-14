const mongoose = require("mongoose");

const organizationBranchSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Organization",
    },
    branchName: { type: String, required: true },
    primaryAddress: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    telePhone: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    companyType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrganizationBranch", organizationBranchSchema);
