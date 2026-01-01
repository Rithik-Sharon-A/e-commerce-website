const userModel = require("../model/user.model");

// --- 1. Create User ---
const createUser = async (req, res) => {
  try {
    const { name, email, age, userId, hobbies, isAdmin, address, skills, experience, description, password } = req.body;
    // Basic validation check for required fields could be added here
    const user = await userModel.create({ name, email, age, userId, hobbies, isAdmin, address, skills, experience, description, password });
    res.status(201).json(user);
  } catch (error) {
    // Status 400 (Bad Request) is often better for validation/schema errors
    res.status(400).json({ message: error.message });
  }
};

// --- 2. Get All Users (Consolidated Query Function with Parameter Normalization) ---
const getAllUsers = async (req, res) => {
  try {
    const q = req.query;
    let query = {};
    let projection = { __v: 0 };



    // === AGE FILTER ===
    const ageKey = Object.keys(q).find(key => key.trim() === "age");
    const age = ageKey ? parseInt(q[ageKey]) : null;
    const age2 = q.age2 ? parseInt(q.age2) : null;
    const minAge = q.minAge ? parseInt(q.minAge) : null;
    const maxAge = q.maxAge ? parseInt(q.maxAge) : null;

    if (minAge && maxAge) query.age = { $gte: minAge, $lte: maxAge };
    else if (age && age2) query.age = { $gt: age, $lt: age2 };
    else if (age) query.age = { $gte: age };

    // === BASIC FIELDS ===
    if (q.name) query.name = { $regex: q.name, $options: "i" };
    if (q.email) query.email = { $regex: q.email, $options: "i" };
    if (q.userId) query.userId = parseInt(q.userId);

    // === HOBBIES ===
    const hobbyKey = Object.keys(q).find(key => key.trim() === "hobbies");
    const hobbyValue = q.hobby || (hobbyKey ? q[hobbyKey] : null);
    if (hobbyValue) query.hobbies = hobbyValue;

    // === ADDRESS ===
    const addressKey = Object.keys(q).find(key => key.trim() === "address");
    const cityValue = q.city || (addressKey ? q[addressKey] : null);
    if (cityValue) query["address.city"] = cityValue;
    if (q.state) query["address.state"] = q.state;

    // === SKILLS ===
    if (q.skillName && q.skillLevel) {
      query.skills = {
        $elemMatch: {
          name: { $regex: q.skillName, $options: "i" },
          level: { $regex: q.skillLevel, $options: "i" },
        },
      };
    } else if (q.skillName) query["skills.name"] = { $regex: q.skillName, $options: "i" };
    else if (q.skillLevel) query["skills.level"] = { $regex: q.skillLevel, $options: "i" };

    // === COMPANY / STACK ===
    if (q.company) query["experience.company"] = { $regex: q.company, $options: "i" };
    if (q.stack) query["experience.projects.stack"] = q.stack;

    // === ADMIN ===
    if (q.isAdmin !== undefined) query.isAdmin = q.isAdmin === "true";

    // === DESCRIPTION TEXT SEARCH (optional) ===
    if (q.description) query.$text = { $search: q.description };

    // === SORT + LIMIT ===
    const sortBy = q.sortBy || "age";
    const sortOrder = q.sortOrder === "asc" ? 1 : -1;
    const limit = q.limit ? parseInt(q.limit) : 10;

    // === RUN QUERY ===
    const users = await userModel.find(query, projection)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: users.length,
      queryUsed: query,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. Placeholder for other necessary CRUD operations (Example: Get by _id) ---
const getUserById = async (req, res) => {
  try {
    // Assuming route uses standard MongoDB _id
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(404).json({ message: "User not found" });
    }
    else { return res.status(200).json({ message: "User logged in successfully" }); }

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  // Note: The redundant single-purpose query functions have been removed
};