import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO } from './user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService
    ) {}

    @Post()
    async create(@Body() user: CreateUserDTO) {
        const foundUser = await this.userService.create(user);
        return this.authService.login(foundUser);
    }

    @Post('login')
    async login(@Body() user: LoginUserDTO) {
        const foundUser = await this.userService.login(user);
        return this.authService.login(foundUser);
    }
}
