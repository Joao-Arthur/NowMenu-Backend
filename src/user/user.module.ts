import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ]
})
export class UserModule {}
