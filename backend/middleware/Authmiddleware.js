const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    req.user = user;
    next();
};
module.exports = authMiddleware;