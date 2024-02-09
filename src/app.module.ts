import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_DB_URL } from './consts/config-name';
import { ThemeModule } from './modules/api/v1/theme/theme.module';
import { TestModule } from '@/modules/api/v1/test/test.module';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import { ModulesModule } from '@/modules/modules.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserMiddleware } from '@/modules/middlewares/user.middleware';
import { ServicesModule } from '@/modules/services/services.module';
import { CookieAuthService } from '@/modules/api/v1/auth/cookie-auth.service';
import { AuthModule } from '@/modules/api/v1/auth/auth.module';


@Module({
    imports    : [
        ConfigModule.forRoot({
            envFilePath: `.env.${ process.env.NODE_ENV }`,
            isGlobal   : true,
        }),
        MongooseModule.forRootAsync({
            imports   : [ ConfigModule ],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>(MONGO_DB_URL),
            }),
            inject    : [ ConfigService ],
        }),
        ModulesModule,
        ScheduleModule.forRoot(),
        ServicesModule,
        AuthModule,
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure (consumer: MiddlewareConsumer) {
        consumer
            .apply(UserMiddleware)
            .forRoutes('*');
    }
}
