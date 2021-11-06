import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth/getJWTPayload';
import { CreateTableDTO } from './table.dto';
import { Table, TableDocument } from './table.entity';

type createTableType = {
    tables: CreateTableDTO[];
    payload: payloadType;
};

@Injectable()
export class TableService {
    constructor(
        @InjectModel(Table.name) private tableModel: Model<TableDocument>
    ) {}

    async createTables({ tables, payload }: createTableType) {
        for (const table of tables) {
            const createdTable = new this.tableModel({
                ...table,
                userId: payload.id
            });
            await createdTable.save();
        }
    }

    async getTables(payload: payloadType) {
        return this.tableModel.find({ userId: payload.id });
    }
}
