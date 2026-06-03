import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { User } from '../users/user.schema';
interface OrderItem {
    name: string;
    price: number;
    quantity: number;
}
export declare class OrdersService {
    private readonly orderModel;
    private readonly userModel;
    private readonly configService;
    private stripe;
    constructor(orderModel: Model<Order>, userModel: Model<User>, configService: ConfigService);
    placeOrder(userId: string, items: unknown[], amount: number, address: Record<string, unknown>): Promise<{
        success: boolean;
        message: string;
    }>;
    placeOrderStripe(userId: string, items: OrderItem[], amount: number, address: Record<string, unknown>, origin: string): Promise<{
        success: boolean;
        message: string;
        session_url?: undefined;
    } | {
        success: boolean;
        session_url: string | null;
        message?: undefined;
    }>;
    verifyStripe(orderId: string, success: string): Promise<{
        success: boolean;
    }>;
    allOrders(): Promise<{
        success: boolean;
        orders: (import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    userOrders(userId: string): Promise<{
        success: boolean;
        orders: (import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    updateStatus(orderId: string, status: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
export {};
