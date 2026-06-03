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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let ProductsService = class ProductsService {
    productModel;
    configService;
    constructor(productModel, configService) {
        this.productModel = productModel;
        this.configService = configService;
    }
    onModuleInit() {
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_SECRET_KEY'),
        });
    }
    uploadBuffer(buffer) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error || !result) {
                    reject(error ?? new Error('Cloudinary upload failed'));
                    return;
                }
                resolve(result.secure_url);
            });
            stream_1.Readable.from(buffer).pipe(uploadStream);
        });
    }
    async addProduct(fields, files) {
        const imageFields = ['image1', 'image2', 'image3', 'image4'];
        const images = files.filter((f) => imageFields.includes(f.fieldname));
        const imagesUrl = await Promise.all(images.map((item) => this.uploadBuffer(item.buffer)));
        const productData = {
            name: fields.name,
            description: fields.description,
            category: fields.category,
            price: Number(fields.price),
            subCategory: fields.subCategory,
            bestseller: fields.bestseller === 'true',
            sizes: JSON.parse(fields.sizes),
            image: imagesUrl,
            date: Date.now(),
        };
        await this.productModel.create(productData);
        return { success: true, message: 'Product Added' };
    }
    async listProducts() {
        const products = await this.productModel.find({});
        return { success: true, products };
    }
    async removeProduct(id) {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        return { success: true, message: 'Product removed' };
    }
    async singleProduct(productId) {
        const product = await this.productModel.findById(productId);
        return { success: true, product };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], ProductsService);
//# sourceMappingURL=products.service.js.map