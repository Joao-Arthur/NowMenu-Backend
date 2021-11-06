import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { CreateItemDTO } from './item.dto';
import { Item, ItemDocument } from './item.entity';
import { Table, TableDocument } from '../table/table.entity';

type createMenuType = {
    items: CreateItemDTO[];
    payload: payloadType;
};

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        @InjectModel(Table.name) private tableModel: Model<TableDocument>
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

    async getMenu(payload: payloadType) {
        return await this.itemModel.find({ userId: payload.id });
    }

    async getRestaurantMenu(tableId: string) {
        const currentTable = await this.tableModel.findById(tableId);
        if (!currentTable) throw new Error('Table not found');
        return this.itemModel.find({ userId: currentTable.userId });
    }
}
