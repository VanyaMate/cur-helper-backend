import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessageType } from '@vanyamate/cur-helper-types';
import {
    ErrorTypeConverter,
} from '@/modules/services/error/error-type-converter.service';
import { ErrorResponseType } from '@vanyamate/cur-helper-types/types/error';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor (
        private readonly _errorTypeConverter: ErrorTypeConverter,
    ) {
    }

    catch (exception: ErrorResponseType, host: ArgumentsHost) {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (exception.errors && exception.code) {
            const code: HttpStatus = this._errorTypeConverter.to(exception.code);
            response
                .status(code)
                .json({
                    errors: exception.errors,
                });
        } else {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    errors: [
                        {
                            target  : 'server',
                            messages: [ 'INTERNAL_SERVER_ERROR' ],
                        },
                    ],
                });
        }
    }
}