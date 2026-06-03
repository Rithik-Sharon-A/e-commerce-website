import { Model } from 'mongoose';
import { CloudinaryService } from '../common/cloudinary.service';
import { AddProductDto, UploadedFilePart } from './dto/add-product.dto';
import { Product } from './schemas/product.schema';
export declare class ProductsService {
    private readonly productModel;
    private readonly cloudinaryService;
    constructor(productModel: Model<Product>, cloudinaryService: CloudinaryService);
    getAllProducts(): Promise<{
        success: boolean;
        products: (import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    getProductById(id: string): Promise<{
        success: boolean;
        message: string;
        product?: undefined;
    } | {
        success: boolean;
        product: import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        message?: undefined;
    }>;
    addProduct(dto: AddProductDto, files: UploadedFilePart[]): Promise<{
        success: boolean;
        message: string;
    }>;
    removeProduct(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
