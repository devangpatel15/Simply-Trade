const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true },
        categoryId : { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    }
)
<<<<<<< HEAD

module.exports = mongoose.model("Model", categorySchema);
=======
module.exports= mongoose.model('Model', modelSchema);
>>>>>>> be9e9958578d54aef75ddcd728c65f5524733671
