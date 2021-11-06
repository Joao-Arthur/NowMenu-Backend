import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });
    await app.listen(process.env.PORT || 8080);
}

bootstrap();

/**
 * TODOS
 * cadastro de tables -> userid
 * cadastro de orders -> tableid e userid se possível por conveniencia
 * get menu
 *  - logado
 *  - deslogado
 * get tables
 * post tables
 * delete tables
 * update tables
 * get orders
 *
 */
