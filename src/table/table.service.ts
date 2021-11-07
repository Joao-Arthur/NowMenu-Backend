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

type getPDFType = {
    res: ExpressResponse;
    userId: string;
    origin: string;
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
        return await this.tableModel.find({ userId: payload.id });
    }

    async deleteTable(id: string) {
        return await this.tableModel.findByIdAndDelete(id);
    }

    async getPDF({ res, userId, origin }: getPDFType) {
        const userTables = await this.tableModel.find({
            userId
        });
        const doc = new PDFDocument();
        doc.pipe(res);

        let count = 0;
        let isFirstPage = true;
        for (const userTable of userTables) {
            const currentURL = await QRCode.toDataURL(
                `${origin}/table/${userTable._id}`
            );
            switch (count % 4) {
                case 0:
                    if (!isFirstPage) doc.addPage();
                    addFirstImage(currentURL, userTable.name);
                    break;
                case 1:
                    addSecondImage(currentURL, userTable.name);
                    break;
                case 2:
                    addThirdImage(currentURL, userTable.name);
                    break;
                case 3:
                    addFourthImage(currentURL, userTable.name);
                    isFirstPage = false;
                    break;
            }
            count++;
        }

        function addFirstImage(currentURL: string, tableName: string) {
            doc.fontSize(22).text(tableName, 100, 70);
            doc.image(currentURL, 80, 100, {
                width: 200,
                height: 200
            });
        }

        function addSecondImage(currentURL: string, tableName: string) {
            doc.fontSize(22).text(tableName, 340, 70);
            doc.image(currentURL, 320, 100, {
                width: 200,
                height: 200
            });
        }

        function addThirdImage(currentURL: string, tableName: string) {
            doc.fontSize(22).text(tableName, 100, 420);
            doc.image(currentURL, 80, 450, {
                width: 200,
                height: 200
            });
        }

        function addFourthImage(currentURL: string, tableName: string) {
            doc.fontSize(22).text(tableName, 340, 420);
            doc.image(currentURL, 320, 450, {
                width: 200,
                height: 200
            });
        }

        doc.end();
    }
}
