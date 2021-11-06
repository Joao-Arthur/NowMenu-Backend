import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() user: CreateUserDTO) {
        return this.userService.create(user);
    }

    @Post('login')
    login(@Body() user: LoginUserDTO) {
        return this.userService.login(user);
    }
}
