import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { CreateItemDTO } from './item.dto';
import { Item, ItemDocument } from './item.entity';

type createMenuType = {
    items: CreateItemDTO[];
    payload: payloadType;
};

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>
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
}
