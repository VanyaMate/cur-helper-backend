import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PORT } from './consts/config-name';
import * as process from 'process';
import { HttpExceptionFilter } from '@/modules/filters/exceptions/http-exception.filter';


async function bootstrap () {
    const app: INestApplication = await NestFactory.create(
        AppModule,
        {
            cors  : {
                origin     : (origin, callback) => {
                    callback(null, origin);
                },
                credentials: true,
            },
            logger: [ 'log', 'fatal', 'error', 'warn', 'debug', 'verbose' ],
        });

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const port: string                 = configService.get<string>(PORT);

    app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(port, () => console.log(`server started on: ${ port }`));
}

bootstrap();