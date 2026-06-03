import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { ProductsService } from './products.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { AddProductDto, UploadedFilePart } from './dto/add-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  list() {
    return this.productsService.getAllProducts();
  }

  @Post('single')
  single(@Body() body: { productId: string }) {
    return this.productsService.getProductById(body.productId);
  }

  @Post('add')
  @UseGuards(AdminAuthGuard)
  async add(@Req() req: FastifyRequest) {
    try {
      const fields: Record<string, string> = {};
      const files: UploadedFilePart[] = [];

      const parts = req.parts();
      for await (const part of parts) {
        if (part.type === 'file') {
          const buffer = await part.toBuffer();
          files.push({ fieldname: part.fieldname, buffer });
        } else {
          fields[part.fieldname] = String(part.value);
        }
      }

      const dto: AddProductDto = {
        name: fields.name,
        description: fields.description,
        category: fields.category,
        price: Number(fields.price),
        subCategory: fields.subCategory,
        bestseller: fields.bestseller === 'true',
        sizes: JSON.parse(fields.sizes),
      };

      return await this.productsService.addProduct(dto, files);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      throw new HttpException({ success: false, message }, HttpStatus.OK);
    }
  }

  @Post('remove')
  @UseGuards(AdminAuthGuard)
  remove(@Body() body: { id: string }) {
    return this.productsService.removeProduct(body.id);
  }
}
