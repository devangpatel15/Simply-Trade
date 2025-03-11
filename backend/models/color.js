const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
    {
        colorName : { type: String, required: true },
        deviceId : { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true }, 
    },{timestamps: true}
<<<<<<< HEAD
)

module.exports = mongoose.model("Color", colorSchema);
=======

)
module.exports = mongoose.model("Color", colorSchema);
>>>>>>> be9e9958578d54aef75ddcd728c65f5524733671
