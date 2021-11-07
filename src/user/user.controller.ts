import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Patch,
    Headers,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getJWTPayload } from 'src/auth/getJWTPayload';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserInfo(@Headers('authorization') authorization) {
        const payload = getJWTPayload(authorization);
        return this.userService.getUserInfo(payload.id);
    }

    @Post()
    async create(@Body() user: CreateUserDTO) {
        const createdUser = await this.userService.create(user);
        return this.authService.login(createdUser);
    }

    @Post('login')
    async login(@Body() user: LoginUserDTO) {
        const foundUser = await this.userService.login(user);
        return this.authService.login(foundUser);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateUserInfo(
        @Body() user: UpdateUserDTO,
        @Headers('authorization') authorization
    ) {
        const payload = getJWTPayload(authorization);
        return this.userService.updateUserInfo(user, payload.id);
    }
}
