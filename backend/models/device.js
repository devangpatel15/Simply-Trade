const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);

// device == iphone , s24 ultra ect 