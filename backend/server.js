const express = require("express");
const mongoose = require("mongoose");
const app = express();
const orderRoute = require("./route/order.route");
const userRoute = require("./route/user.route");
const productRoute = require("./route/product.route");
const categoryRoute = require("./route/category.route");

// Middleware to parse JSON body
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose.connect("mongodb://localhost:27017/ordersDB")

app.get("/", (req, res) => {
    res.send("Orders API - Welcome!");
});

app.use("/order", orderRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);