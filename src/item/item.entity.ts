import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Item {
    @Prop()
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({})
    description: string;

    @Prop({})
    prepareTime: number;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    category: string;
}

export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);
