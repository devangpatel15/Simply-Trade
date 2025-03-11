const mongoose = require("mongoose");

const capacitySchema = new mongoose.Schema(
    {
        capacityName : { type: String, required: true },
        deviceId : { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    },
    { timestamps: true}
)