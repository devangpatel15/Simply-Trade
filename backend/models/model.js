const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Model", modelSchema);
//model == brand of category