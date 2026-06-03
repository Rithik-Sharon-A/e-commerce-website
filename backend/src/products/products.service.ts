import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../common/cloudinary.service';
import { AddProductDto, UploadedFilePart } from './dto/add-product.dto';
import { Product } from './schemas/product.schema';

const IMAGE_FIELDS = ['image1', 'image2', 'image3', 'image4'];

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getAllProducts() {
    const products = await this.productModel.find({});
    return { success: true, products };
  }

  async getProductById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    return { success: true, product };
  }

  async addProduct(dto: AddProductDto, files: UploadedFilePart[]) {
    const imageUrls = await this.cloudinaryService.uploadFiles(
      files,
      IMAGE_FIELDS,
    );

    await this.productModel.create({
      ...dto,
      image: imageUrls,
      date: Date.now(),
    });

    return { success: true, message: 'Product Added' };
  }

  async removeProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    return { success: true, message: 'Product removed' };
  }
}
