const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    orderDesc: {
        type: String,
        required: true
    },
    orderValue: {
        type: Number,
        required: true
    },
    productsDesc: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);

