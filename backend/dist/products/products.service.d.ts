import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Product } from './product.schema';
interface UploadedFilePart {
    fieldname: string;
    buffer: Buffer;
}
export declare class ProductsService implements OnModuleInit {
    private readonly productModel;
    private readonly configService;
    constructor(productModel: Model<Product>, configService: ConfigService);
    onModuleInit(): void;
    private uploadBuffer;
    addProduct(fields: Record<string, string>, files: UploadedFilePart[]): Promise<{
        success: boolean;
        message: string;
    }>;
    listProducts(): Promise<{
        success: boolean;
        products: (import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    removeProduct(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    singleProduct(productId: string): Promise<{
        success: boolean;
        product: (import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
}
export {};
