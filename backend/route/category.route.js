const express = require("express");
const router = express.Router();
const controller = require("../controller/category.controller");

// Category CRUD operations
router.post("/create", controller.createCategory);
router.get("/all", controller.getAllCategories);

// Category hierarchy and tree structure
router.get("/tree", controller.getCategoryTree);

// Category aggregations with product statistics
router.get("/aggregation", controller.aggregateCategories);

module.exports = router;