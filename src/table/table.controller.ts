import {
    Controller,
    Post,
    Body,
    UseGuards,
    Headers,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDTO } from './table.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getJWTPayload } from '../auth/getJWTPayload';

@Controller('item')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async createMenu(
        @Body() tables: CreateTableDTO[],
        @Headers('authorization') authorization
    ) {
        const payload = getJWTPayload(authorization);
        await this.tableService.createTables({ tables, payload });
    }
}
