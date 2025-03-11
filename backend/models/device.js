const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        deviceName : { type: String, required: true },
        modelId : { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true },
    },{timestamps: true}
)

<<<<<<< HEAD
module.exports = mongoose.model("Device", deviceSchema);
=======
module.exports = mongoose.model("Device", deviceSchema);
>>>>>>> be9e9958578d54aef75ddcd728c65f5524733671
