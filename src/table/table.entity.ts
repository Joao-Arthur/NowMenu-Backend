import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Table {
    @Prop()
    userId: string;

    @Prop()
    name: string;
}

export type TableDocument = Table & Document;
export const TableSchema = SchemaFactory.createForClass(Table);
