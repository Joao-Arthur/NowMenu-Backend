import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { item } from './order.dto';

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    tableId: string;

    @Prop()
    tableName: string;

    @Prop({ required: true })
    userId: string;

    @Prop()
    name: string;

    @Prop()
    customer: string;

    @Prop([
        {
            itemId: String,
            itemName: String,
            amount: Number,
            observation: String,
            prepareTime: Number,
            price: Number
        }
    ])
    items: item[];

    @Prop()
    active: boolean;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
