import {
    Controller,
    Post,
    Body,
    UseGuards,
    Headers,
    HttpCode,
    HttpStatus,
    Get
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDTO } from './table.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getJWTPayload } from '../auth/getJWTPayload';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async createTables(
        @Body() tables: CreateTableDTO[],
        @Headers('authorization') authorization
    ) {
        const payload = getJWTPayload(authorization);
        await this.tableService.createTables({ tables, payload });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTables(@Headers('authorization') authorization) {
        const payload = getJWTPayload(authorization);
        return await this.tableService.getTables(payload);
    }
}