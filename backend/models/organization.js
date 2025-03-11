const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, require: true },
    primaryAddress: { type: String, require: true },
    addressLine1: { type: String, require: true },
    addressLine2: { type: String },
    city: { type: String, require: true },
    state: { type: String, require: true },
    zipCode: { type: String, require: true },
    country: { type: String, require: true },
    telePhone: { type: String, require: true },
    email: { type: String, require: true },
    upload:{type:String, require:true},
    gstApplicable: { type: Boolean, require: true },
    gstNumber: { type: String },
    companyType: { type: String, require: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
