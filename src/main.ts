import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PORT } from './consts/config-name';
import { HttpExceptionFilter } from '@/modules/filters/exceptions/http-exception.filter';
import {
    ErrorTypeConverter,
} from '@/modules/services/error/error-type-converter.service';


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

    const configService: ConfigService           = app.get<ConfigService>(ConfigService);
    const errorTypeConverter: ErrorTypeConverter = app.get<ErrorTypeConverter>(ErrorTypeConverter);
    const port: string                           = configService.get<string>(PORT);

    app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter(errorTypeConverter));
    await app.listen(port, () => console.log(`server started on: ${ port }`));
}

bootstrap();