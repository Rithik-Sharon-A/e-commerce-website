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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CartService = class CartService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addToCart(userId, itemId, size) {
        if (!itemId || !size) {
            return { success: false, message: 'ItemId and size required' };
        }
        const userData = await this.userModel.findById(userId);
        if (!userData) {
            return { success: false, message: 'User not found' };
        }
        const cartData = { ...(userData.cartData || {}) };
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        await this.userModel.findByIdAndUpdate(userId, { $set: { cartData } });
        return { success: true, message: 'Added To Cart' };
    }
    async updateCart(userId, itemId, size, quantity) {
        const userData = await this.userModel.findById(userId);
        if (!userData) {
            return { success: false, message: 'User not found' };
        }
        const cartData = { ...(userData.cartData || {}) };
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = quantity;
        await this.userModel.findByIdAndUpdate(userId, { $set: { cartData } });
        return { success: true, message: 'Cart Updated' };
    }
    async getUserCart(userId) {
        const userData = await this.userModel.findById(userId);
        return {
            success: true,
            cartData: userData?.cartData || {},
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map