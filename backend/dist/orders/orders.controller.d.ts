import type { FastifyRequest } from 'fastify';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    list(): Promise<{
        success: boolean;
        orders: (import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    status(body: {
        orderId: string;
        status: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    place(req: FastifyRequest & {
        userId: string;
    }, body: {
        items: unknown[];
        amount: number;
        address: Record<string, unknown>;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    stripe(req: FastifyRequest & {
        userId: string;
    }, origin: string, body: {
        items: {
            name: string;
            price: number;
            quantity: number;
        }[];
        amount: number;
        address: Record<string, unknown>;
    }): Promise<{
        success: boolean;
        message: string;
        session_url?: undefined;
    } | {
        success: boolean;
        session_url: string | null;
        message?: undefined;
    }>;
    razorpay(): {};
    userOrders(req: FastifyRequest & {
        userId: string;
    }): Promise<{
        success: boolean;
        orders: (import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    verifyStripe(orderId: string, success: string): Promise<{
        success: boolean;
    }>;
}
