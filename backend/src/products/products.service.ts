import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Product } from './product.schema';

interface UploadedFilePart {
  fieldname: string;
  buffer: Buffer;
}

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_SECRET_KEY'),
    });
  }

  private uploadBuffer(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Cloudinary upload failed'));
            return;
          }
          resolve(result.secure_url);
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }

  async addProduct(
    fields: Record<string, string>,
    files: UploadedFilePart[],
  ) {
    const imageFields = ['image1', 'image2', 'image3', 'image4'];
    const images = files.filter((f) => imageFields.includes(f.fieldname));

    const imagesUrl = await Promise.all(
      images.map((item) => this.uploadBuffer(item.buffer)),
    );

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

  async removeProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    return { success: true, message: 'Product removed' };
  }

  async singleProduct(productId: string) {
    const product = await this.productModel.findById(productId);
    return { success: true, product };
  }
}
