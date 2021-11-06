import {
    Controller,
    Post,
    Body,
    UseGuards,
    Headers,
    HttpCode,
    HttpStatus
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
}
