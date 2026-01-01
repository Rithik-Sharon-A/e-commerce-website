const orderModel = require("../model/order.model");

const createOrder = async (req, res) => {
    try {
        const { orderId, orderDesc, orderValue, productsDesc, userId } = req.body;
        const order = await orderModel.create({ orderId, orderDesc, orderValue, productsDesc, userId });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}, { orderId: 1, orderDesc: 1, orderValue: 1, productsDesc: 1, userId: 1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderbyOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderDesc, orderValue, productsDesc } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { orderDesc, orderValue, productsDesc }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderModel.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteOrderbyOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};



module.exports = { createOrder, getAllOrders, getOrderByOrderId, getOrderByUserId, updateOrderbyOrderId, deleteOrderbyOrderId};
