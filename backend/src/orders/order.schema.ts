import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Array, required: true })
  items: unknown[];

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Object, required: true })
  address: Record<string, unknown>;

  @Prop({ required: true, default: 'Order Placed' })
  status: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true, default: false })
  payment: boolean;

  @Prop({ required: true })
  date: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
