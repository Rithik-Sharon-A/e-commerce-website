const controller = require("../controller/user.controller");
const express = require("express");
const router = express.Router();

// Create user
router.post("/create", controller.createUser);

// Get all users with flexible query parameters
// Supports: age, minAge, maxAge, age2, name, email, userId, hobby, 
//           city, state, skillName, skillLevel,
//           company, stack, isAdmin, description (text search),
//           sortBy, sortOrder, limit
router.get("/getAll", controller.getAllUsers);

// Get user by ID
router.get("/:id", controller.getUserById);

// Login user
router.post("/login", controller.loginUser);
module.exports = router;
