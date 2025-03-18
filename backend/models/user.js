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
>>>>>>> dc17af5cb0b6f0d2bb4bcf6690fb265acc3812d2
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
