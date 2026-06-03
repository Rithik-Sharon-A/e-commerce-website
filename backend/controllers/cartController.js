import userModel from "../models/userModel.js";

// ================= ADD TO CART =================
const addToCart = async (req, res) => {

    console.log("req.userId:", req.userId);
    
    try {
        const { itemId, size } = req.body;
        const userId = req.userId;

        if (!itemId || !size) {
            return res.json({ success: false, message: "ItemId and size required" });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Initialize product if not exists
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Increase quantity
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, {
            $set: { cartData }
        });

        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ================= UPDATE CART =================
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {
            $set: { cartData }
        });

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ================= GET USER CART =================
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId);

        res.json({
            success: true,
            cartData: userData.cartData || {}
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
