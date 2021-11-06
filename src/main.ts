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
 *
 * todo do projeto
 * jwt token
 * cadastro de items -> userid
 * cadastro de tables -> userid
 * cadastro de orders -> tableid e userid se possível por conveniencia
 *
 *
 *
 *
 */
