const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
<<<<<<< HEAD
    {
        colorName : { type: String, required: true },
        deviceId : { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true }, 
    },{timestamps: true}

)
=======
  {
    colorName: { type: String, required: true },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
  },
  { timestamps: true }
);
>>>>>>> f9266f62b19ae41dcd4d0e528a79e2760208362d
module.exports = mongoose.model("Color", colorSchema);
