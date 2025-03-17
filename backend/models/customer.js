const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    orgBranchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrganizationBranch",
        // required: true,
    },
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        // required: true,
    },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);