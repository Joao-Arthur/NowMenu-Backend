import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item, ItemSchema } from './item.entity';
import { AuthModule } from '../auth/auth.module';
import { TableModule } from '../table/table.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
        AuthModule,
        TableModule,
        UserModule
    ],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule {}
