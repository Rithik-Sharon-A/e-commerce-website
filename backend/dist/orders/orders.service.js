"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stripe_1 = __importDefault(require("stripe"));
const currency = 'inr';
const deliveryCharge = 100;
let OrdersService = class OrdersService {
    orderModel;
    userModel;
    configService;
    stripe = null;
    constructor(orderModel, userModel, configService) {
        this.orderModel = orderModel;
        this.userModel = userModel;
        this.configService = configService;
        const stripeKey = this.configService.get('STRIPE_SECRET_KEY');
        if (stripeKey && stripeKey !== 'add_later') {
            this.stripe = new stripe_1.default(stripeKey);
        }
    }
    async placeOrder(userId, items, amount, address) {
        const newOrder = await this.orderModel.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        });
        await this.userModel.findByIdAndUpdate(userId, { cartData: {} });
        return { success: true, message: 'Order Placed' };
    }
    async placeOrderStripe(userId, items, amount, address, origin) {
        if (!this.stripe) {
            return { success: false, message: 'Stripe is not configured' };
        }
        const newOrder = await this.orderModel.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        });
        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });
        const session = await this.stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });
        return { success: true, session_url: session.url };
    }
    async verifyStripe(orderId, success) {
        if (success === 'true') {
            const order = await this.orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
            if (order) {
                await this.userModel.findByIdAndUpdate(order.userId, { cartData: {} });
            }
            return { success: true };
        }
        await this.orderModel.findByIdAndDelete(orderId);
        return { success: false };
    }
    async allOrders() {
        const orders = await this.orderModel.find({});
        return { success: true, orders };
    }
    async userOrders(userId) {
        const orders = await this.orderModel.find({ userId });
        return { success: true, orders };
    }
    async updateStatus(orderId, status) {
        await this.orderModel.findByIdAndUpdate(orderId, { status });
        return { success: true, message: 'Status Updated' };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('order')),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map