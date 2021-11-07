import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { User, UserDocument } from '../user/user.entity';
import { Table, TableDocument } from '../table/table.entity';
import { CreateOrderDTO } from './order.dto';
import { Order, OrderDocument } from './order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Table.name) private tableModel: Model<TableDocument>
    ) {}

    async createOrder(order: CreateOrderDTO) {
        const currentTable = await this.tableModel.findById(order.tableId);
        const currentUser = await this.userModel.findById(currentTable.userId);
        const createdOrder = new this.orderModel({
            ...order,
            userId: currentUser.id,
            tableName: currentTable.name,
            active: true
        });
        await createdOrder.save();
    }

    async getOrders(payload: payloadType) {
        return await this.orderModel.find({ userId: payload.id, active: true });
    }

    async getOrder(id: string) {
        return await this.orderModel.findById(id);
    }

    async setDone(id: string) {
        await this.orderModel.findByIdAndUpdate(id, { active: false });
    }
}
