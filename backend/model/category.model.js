const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    categoryDescription: { type: String, required: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "categories", default: null },
    level: { type: Number, default: 0 }, // 0 for root, 1 for first level, etc.
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Index for faster queries
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ categoryId: 1 });

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;