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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../common/cloudinary.service");
const product_schema_1 = require("./schemas/product.schema");
const IMAGE_FIELDS = ['image1', 'image2', 'image3', 'image4'];
let ProductsService = class ProductsService {
    productModel;
    cloudinaryService;
    constructor(productModel, cloudinaryService) {
        this.productModel = productModel;
        this.cloudinaryService = cloudinaryService;
    }
    async getAllProducts() {
        const products = await this.productModel.find({});
        return { success: true, products };
    }
    async getProductById(id) {
        const product = await this.productModel.findById(id);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        return { success: true, product };
    }
    async addProduct(dto, files) {
        const imageUrls = await this.cloudinaryService.uploadFiles(files, IMAGE_FIELDS);
        await this.productModel.create({
            ...dto,
            image: imageUrls,
            date: Date.now(),
        });
        return { success: true, message: 'Product Added' };
    }
    async removeProduct(id) {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        return { success: true, message: 'Product removed' };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], ProductsService);
//# sourceMappingURL=products.service.js.map