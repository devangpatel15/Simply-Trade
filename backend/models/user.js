const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    mobileNo: { type: String, require: true },
    password: { type: String, require: true },
    verificationCode:{type:Number}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
