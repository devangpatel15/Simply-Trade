const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    mobileNo: { type: String, require: true },
    password: { type: String, require: true },
    // role : { type: String , enum : ['admin','customer'], default : 'admin'},
    verificationCode: { type: String },
    codeExpires: { type: Date },
    organization : { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    orgBranch : { type: mongoose.Schema.Types.ObjectId, ref: 'Org'},
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
