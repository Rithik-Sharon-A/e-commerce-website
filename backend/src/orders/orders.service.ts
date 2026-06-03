import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import type { Stripe as StripeType } from 'stripe';
import { Order } from './order.schema';
import { User } from '../users/user.schema';

const currency = 'inr';
const deliveryCharge = 100;

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class OrdersService {
  private stripe: StripeType | null = null;

  constructor(
    @InjectModel('order') private readonly orderModel: Model<Order>,
    @InjectModel('user') private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (stripeKey && stripeKey !== 'add_later') {
      this.stripe = new Stripe(stripeKey);
    }
  }

  async placeOrder(
    userId: string,
    items: unknown[],
    amount: number,
    address: Record<string, unknown>,
  ) {
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

  async placeOrderStripe(
    userId: string,
    items: OrderItem[],
    amount: number,
    address: Record<string, unknown>,
    origin: string,
  ) {
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

  async verifyStripe(orderId: string, success: string) {
    if (success === 'true') {
      const order = await this.orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true },
      );

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

  async userOrders(userId: string) {
    const orders = await this.orderModel.find({ userId });
    return { success: true, orders };
  }

  async updateStatus(orderId: string, status: string) {
    await this.orderModel.findByIdAndUpdate(orderId, { status });
    return { success: true, message: 'Status Updated' };
  }
}
