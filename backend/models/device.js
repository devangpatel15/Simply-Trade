const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
