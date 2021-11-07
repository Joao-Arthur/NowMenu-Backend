import {
    Controller,
    Post,
    Body,
    UseGuards,
    Headers,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    Patch
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getJWTPayload } from '../auth/getJWTPayload';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async createOrder(@Body() order: CreateOrderDTO) {
        await this.orderService.createOrder(order);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrders(@Headers('authorization') authorization) {
        const payload = getJWTPayload(authorization);
        return await this.orderService.getOrders(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOrder(@Param() params) {
        return await this.orderService.getOrder(params.id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async setDone(@Param() params) {
        await this.orderService.setDone(params.id);
    }
}
