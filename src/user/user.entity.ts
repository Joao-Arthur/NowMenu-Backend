import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop()
    cnpj: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    telephone: string;

    @Prop()
    cep: string;

    @Prop()
    address: string;

    @Prop()
    district: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    hash: string;

    @Prop({ required: true })
    salt: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
