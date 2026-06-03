import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  image: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subCategory: string;

  @Prop({ type: [String], required: true })
  sizes: string[];

  @Prop({ default: false })
  bestseller: boolean;

  @Prop({ required: true })
  date: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
