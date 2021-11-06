import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from '../item/items.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),
        UserModule,
        ItemModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}