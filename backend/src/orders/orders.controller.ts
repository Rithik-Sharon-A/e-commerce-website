import {
  Body,
  Controller,
  Headers,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminAuthGuard } from '../auth/admin-auth.guard';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('list')
  @UseGuards(AdminAuthGuard)
  list() {
    return this.ordersService.allOrders();
  }

  @Post('status')
  @UseGuards(AdminAuthGuard)
  status(@Body() body: { orderId: string; status: string }) {
    return this.ordersService.updateStatus(body.orderId, body.status);
  }

  @Post('place')
  @UseGuards(JwtAuthGuard)
  place(
    @Req() req: FastifyRequest & { userId: string },
    @Body()
    body: {
      items: unknown[];
      amount: number;
      address: Record<string, unknown>;
    },
  ) {
    return this.ordersService.placeOrder(
      req.userId,
      body.items,
      body.amount,
      body.address,
    );
  }

  @Post('stripe')
  @UseGuards(JwtAuthGuard)
  stripe(
    @Req() req: FastifyRequest & { userId: string },
    @Headers('origin') origin: string,
    @Body()
    body: {
      items: { name: string; price: number; quantity: number }[];
      amount: number;
      address: Record<string, unknown>;
    },
  ) {
    return this.ordersService.placeOrderStripe(
      req.userId,
      body.items,
      body.amount,
      body.address,
      origin ?? '',
    );
  }

  @Post('razorpay')
  @UseGuards(JwtAuthGuard)
  razorpay() {
    return {};
  }

  @Post('userorders')
  @UseGuards(JwtAuthGuard)
  userOrders(@Req() req: FastifyRequest & { userId: string }) {
    return this.ordersService.userOrders(req.userId);
  }

  @Post('verifyStripe')
  @UseGuards(JwtAuthGuard)
  verifyStripe(
    @Query('orderId') orderId: string,
    @Query('success') success: string,
  ) {
    return this.ordersService.verifyStripe(orderId, success);
  }
}
