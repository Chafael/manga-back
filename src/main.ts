import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3001);
    const origin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');

    app.enableCors({
        origin,
    });

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    await app.listen(port);
}
bootstrap();
