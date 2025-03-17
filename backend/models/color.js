const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    colorName: { type: String, required: true },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
