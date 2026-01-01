const controller = require("../controller/order.controller");
const express = require("express");
const router = express.Router();

router.post("/create", controller.createOrder);
router.get("/getAll", controller.getAllOrders);
router.get("/getByUserId/:userId", controller.getOrderByUserId);
router.get("/getByOrderId/:orderId", controller.getOrderByOrderId);
router.put("/updateByOrderId/:orderId", controller.updateOrderbyOrderId);
router.delete("/deleteByOrderId/:orderId", controller.deleteOrderbyOrderId);
router.get("/getOrdersAggregation", controller.getOrdersAggregation);
module.exports = router;

