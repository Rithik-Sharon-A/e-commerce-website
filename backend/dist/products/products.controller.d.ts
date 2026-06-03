import type { FastifyRequest } from 'fastify';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    list(): Promise<{
        success: boolean;
        products: (import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/product.schema").Product & {
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
        message: string;
        product?: undefined;
    } | {
        success: boolean;
        product: import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        message?: undefined;
    }>;
    add(req: FastifyRequest): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(body: {
        id: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
