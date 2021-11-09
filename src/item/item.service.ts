import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { CreateItemDTO } from './item.dto';
import { Item, ItemDocument } from './item.entity';
import { Table, TableDocument } from '../table/table.entity';
import { User, UserDocument } from '../user/user.entity';

type createMenuType = {
    items: CreateItemDTO[];
    payload: payloadType;
};

type createItemType = {
    item: CreateItemDTO;
    payload: payloadType;
};

type updateItemType = {
    name: string;
    description: string;
    prepareTime: number;
    price: number;
};

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        @InjectModel(Table.name) private tableModel: Model<TableDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createMenu({ items, payload }: createMenuType) {
        for (const item of items) {
            const createdItem = new this.itemModel({
                ...item,
                userId: payload.id
            });
            await createdItem.save();
        }
    }

    async createItem({ item, payload }: createItemType) {
        const createdItem = new this.itemModel({
            ...item,
            userId: payload.id
        });
        await createdItem.save();
    }

    async getMenu(payload: payloadType) {
        return await this.itemModel.find({ userId: payload.id });
    }

    async getRestaurantMenu(tableId: string) {
        const currentTable = await this.tableModel.findById(tableId);
        if (!currentTable) throw new Error('Table not found');
        const items = await this.itemModel.find({
            userId: currentTable.userId
        });
        const { name, telephone, cep, address, district, city, state, email } =
            await this.userModel.findById(currentTable.userId);
        return {
            items,
            restaurant: {
                name,
                telephone,
                cep,
                address,
                district,
                city,
                state,
                email
            }
        };
    }

    async deleteItem(id: string) {
        return await this.itemModel.findByIdAndDelete(id);
    }

    async getItem(id: string) {
        return await this.itemModel.findById(id);
    }

    async updateItem(id: string, itemToUpdate: updateItemType) {
        return await this.itemModel.findByIdAndUpdate(id, itemToUpdate);
    }
}
