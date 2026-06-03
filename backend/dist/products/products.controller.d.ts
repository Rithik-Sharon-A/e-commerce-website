import type { FastifyRequest } from 'fastify';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    list(): Promise<{
        success: boolean;
        products: (import("mongoose").Document<unknown, {}, import("./product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    single(body: {
        productId: string;
    }): Promise<{
        success: boolean;
        product: (import("mongoose").Document<unknown, {}, import("./product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
    remove(body: {
        id: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    add(req: FastifyRequest): Promise<{
        success: boolean;
        message: string;
    }>;
}
