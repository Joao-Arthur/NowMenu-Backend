import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './user.dto';
import { User, UserDocument } from './user.entity';
import { getHash, getSalt } from 'src/authorization/authorization';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create({
        cnpj,
        name,
        telephone,
        cep,
        address,
        district,
        city,
        state,
        email,
        password
    }: CreateUserDTO) {
        const salt = getSalt();

        const createdUser = new this.userModel({
            cnpj,
            name,
            telephone,
            cep,
            address,
            district,
            city,
            state,
            email,
            hash: getHash({ salt, password }),
            salt
        });
        await createdUser.save();
        return { token: 'MOCK TOKEN' };
    }

    async login({ email, password }: LoginUserDTO) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) throw new Error();
            if (user.hash !== getHash({ password, salt: user.salt }))
                throw new Error();
            return { token: 'MOCK TOKEN' };
        } catch {
            throw new HttpException(
                'Usuário ou senha incorretos!',
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
