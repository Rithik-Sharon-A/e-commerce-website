import type { FastifyRequest } from 'fastify';
import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    get(req: FastifyRequest & {
        userId: string;
    }): Promise<{
        success: boolean;
        cartData: Record<string, Record<string, number>>;
    }>;
    add(req: FastifyRequest & {
        userId: string;
    }, body: {
        itemId: string;
        size: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    update(req: FastifyRequest & {
        userId: string;
    }, body: {
        itemId: string;
        size: string;
        quantity: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
