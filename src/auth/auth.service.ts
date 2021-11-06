import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(user: UserDocument) {
        return {
            token: this.jwtService.sign({ id: user._id, name: user.name })
        };
    }
}
