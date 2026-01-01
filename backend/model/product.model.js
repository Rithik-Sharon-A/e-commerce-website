const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productCategory: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Indexes for better performance
productSchema.index({ productCategory: 1 });
productSchema.index({ productId: 1 });

module.exports = mongoose.model("products", productSchema);