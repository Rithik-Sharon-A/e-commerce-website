import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('get')
  @UseGuards(JwtAuthGuard)
  get(@Req() req: FastifyRequest & { userId: string }) {
    return this.cartService.getUserCart(req.userId);
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  add(
    @Req() req: FastifyRequest & { userId: string },
    @Body() body: { itemId: string; size: string },
  ) {
    return this.cartService.addToCart(req.userId, body.itemId, body.size);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: FastifyRequest & { userId: string },
    @Body() body: { itemId: string; size: string; quantity: number },
  ) {
    return this.cartService.updateCart(
      req.userId,
      body.itemId,
      body.size,
      body.quantity,
    );
  }
}
