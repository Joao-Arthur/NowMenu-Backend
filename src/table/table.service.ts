import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { CreateTableDTO } from './table.dto';
import { Table, TableDocument } from './table.entity';

type createMenuType = {
    tables: CreateTableDTO[];
    payload: payloadType;
};

@Injectable()
export class TableService {
    constructor(
        @InjectModel(Table.name) private itemModel: Model<TableDocument>
    ) {}

    async createTables({ tables, payload }: createMenuType) {
        for (const item of tables) {
            const createdTable = new this.itemModel({
                ...item,
                userId: payload.id
            });
            await createdTable.save();
        }
    }
}
