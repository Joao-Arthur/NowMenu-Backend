import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { CreateOrderDTO } from './order.dto';
import { Order, OrderDocument } from './order.entity';

type createOrderType = {
    order: CreateOrderDTO;
    payload: payloadType;
};

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>
    ) {}

    async createOrder({ order, payload }: createOrderType) {
        const createdOrder = new this.orderModel({
            ...order,
            userId: payload.id
        });
        await createdOrder.save();
    }

    async getOrders(payload: payloadType) {
        return await this.orderModel.find({ userId: payload.id });
    }
}
