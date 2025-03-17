const mongoose = require("mongoose");

const capacitySchema = new mongoose.Schema(
  {
    capacityName: { type: String, required: true },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capacity", capacitySchema);
