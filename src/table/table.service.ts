import { Model } from 'mongoose';
import { Response as ExpressResponse } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import * as QRCode from 'qrcode';
import * as PDFDocument from 'pdfkit';
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

    async getPDF(res: ExpressResponse, userId: string) {
        const url1 = await QRCode.toDataURL('João');
        const url2 = await QRCode.toDataURL('Arthur');
        const url3 = await QRCode.toDataURL('Lothamer');
        const url4 = await QRCode.toDataURL('Fernandes');
        const doc = new PDFDocument();
        doc.pipe(res);
        doc.fontSize(22).text('Mesa 0', 100, 70);
        doc.image(url1, 80, 100, {
            width: 200,
            height: 200
        });
        doc.fontSize(22).text('Mesa 1', 340, 70);
        doc.image(url2, 320, 100, {
            width: 200,
            height: 200
        });
        doc.fontSize(22).text('Mesa 2', 100, 420);
        doc.image(url3, 80, 450, {
            width: 200,
            height: 200
        });
        doc.fontSize(22).text('Mesa 3', 340, 420);
        doc.image(url4, 320, 450, {
            width: 200,
            height: 200
        });
        doc.addPage();
        doc.end();
    }
}
