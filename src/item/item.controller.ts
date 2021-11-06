import {
    Controller,
    Post,
    Body,
    UseGuards,
    Headers,
    HttpCode,
    HttpStatus,
    Get,
    Query,
    HttpException
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDTO } from './item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getJWTPayload } from '../auth/getJWTPayload';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async createMenu(
        @Body() items: CreateItemDTO[],
        @Headers('authorization') authorization
    ) {
        const payload = getJWTPayload(authorization);
        await this.itemService.createMenu({ items, payload });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMenu(@Headers('authorization') authorization) {
        const payload = getJWTPayload(authorization);
        return await this.itemService.getMenu(payload);
    }

    @Get('restaurant')
    async getRestaurantMenu(@Query('tableId') tableId: string) {
        if (!tableId)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        try {
            return await this.itemService.getRestaurantMenu(tableId);
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
