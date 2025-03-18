const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    password: { type: String, required: true },
    // role : { type: String , enum : ['admin','customer'], default : 'admin'},
    verificationCode: { type: String },
    codeExpires: { type: Date },
<<<<<<< HEAD
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    orgBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganizationBranch",
    },
=======
    organization : { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    orgBranch : { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationBranch'},
>>>>>>> 9f62fe5d43ab5a6984bf5f6d3e4dcb384b2f16a9
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
