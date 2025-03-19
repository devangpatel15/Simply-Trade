const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    colorName: { type: String, required: true },
    categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
          },
        modelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Model",
          required: true,
        },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
     organization : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
      branchName : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrganizationBranch",
      },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
