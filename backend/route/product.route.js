const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller");

// Product CRUD operations
router.post("/create", controller.createProduct);
router.get("/all", controller.getAllProducts);

// Category-based product queries
router.get("/category/:categoryId", controller.getProductsByCategory);

// Aggregations
router.get("/aggregation/by-category", controller.aggregateProductsByCategory);
router.get("/aggregation/statistics", controller.getProductStatistics);

module.exports = router;