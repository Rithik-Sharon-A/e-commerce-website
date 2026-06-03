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

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  list() {
    return this.productsService.listProducts();
  }

  @Post('single')
  single(@Body() body: { productId: string }) {
    return this.productsService.singleProduct(body.productId);
  }

  @Post('remove')
  @UseGuards(AdminAuthGuard)
  remove(@Body() body: { id: string }) {
    return this.productsService.removeProduct(body.id);
  }

  @Post('add')
  @UseGuards(AdminAuthGuard)
  async add(@Req() req: FastifyRequest) {
    try {
      const fields: Record<string, string> = {};
      const files: { fieldname: string; buffer: Buffer }[] = [];

      const parts = req.parts();
      for await (const part of parts) {
        if (part.type === 'file') {
          const buffer = await part.toBuffer();
          files.push({ fieldname: part.fieldname, buffer });
        } else {
          fields[part.fieldname] = String(part.value);
        }
      }

      return await this.productsService.addProduct(fields, files);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      throw new HttpException(
        { success: false, message },
        HttpStatus.OK,
      );
    }
  }
}
