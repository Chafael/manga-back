import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MangasModule } from './mangas/mangas.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RateLimiterModule,
        MangasModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RateLimiterGuard,
        },
    ],
})
export class AppModule { }
