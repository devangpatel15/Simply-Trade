const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true },
        categoryId : { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    }
)

module.exports = mongoose.model("Model", categorySchema);