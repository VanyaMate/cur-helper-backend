import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_DB_URL } from './consts/config-name';
import { ThemeModule } from './modules/api/v1/theme/theme.module';


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
        ThemeModule,
    ],
    controllers: [],
    providers  : [],
})
export class AppModule {
}
