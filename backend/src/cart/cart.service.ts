import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async addToCart(userId: string, itemId: string, size: string) {
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

  async updateCart(
    userId: string,
    itemId: string,
    size: string,
    quantity: number,
  ) {
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

  async getUserCart(userId: string) {
    const userData = await this.userModel.findById(userId);
    return {
      success: true,
      cartData: userData?.cartData || {},
    };
  }
}
