import {
    Controller,
    Post,
    Body,
    UseGuards,
    Headers,
    HttpCode,
    HttpStatus,
    Get,
    Header,
    Response,
    Query,
    HttpException,
    Delete,
    Param
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
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

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteTable(@Param() params) {
        await this.tableService.deleteTable(params.id);
    }

    @Header('content-type', 'application/pdf')
    @Get('qrcode')
    async getPDF(
        @Response() res: ExpressResponse,
        @Query('userId') userId: string,
        @Query('origin') origin: string
    ) {
        if (!userId || !origin)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        return await this.tableService.getPDF({ res, userId, origin });
    }
}
