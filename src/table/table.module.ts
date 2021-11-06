import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { Table, TableSchema } from './table.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
        AuthModule
    ],
    controllers: [TableController],
    providers: [TableService],
    exports: [
        MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }])
    ]
})
export class TableModule {}
