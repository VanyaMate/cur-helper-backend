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


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor (
        private readonly _errorTypeConverter: ErrorTypeConverter,
    ) {
    }

    catch (exception: ErrorMessageType, host: ArgumentsHost) {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (exception.messages && exception.code) {
            const code: HttpStatus = this._errorTypeConverter.to(exception.code);
            response
                .status(code)
                .json({
                    messages: exception.messages,
                });
        } else {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    message: 'INTERNAL_SERVER_ERROR',
                });
        }
    }
}