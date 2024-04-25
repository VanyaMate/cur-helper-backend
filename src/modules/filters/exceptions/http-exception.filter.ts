import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus, HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessageType } from '@vanyamate/cur-helper-types';
import {
    ErrorTypeConverter,
} from '@/modules/services/error/error-type-converter.service';
import { ErrorResponseType } from '@vanyamate/cur-helper-types/types/error';


const isErrorResponseType = function (error: unknown): error is ErrorResponseType {
    if (typeof error !== 'object') {
        return false;
    }

    if (
        !Array.isArray(error['errors']) ||
        typeof error['code'] !== 'number'
    ) {
        return false;
    }

    return true;
};

const isHttpExceptionError = function (error: unknown): error is HttpException {
    if (typeof error !== 'object') {
        return false;
    }
    if (
        typeof error['response'] !== 'string' ||
        typeof error['status'] !== 'number'
    ) {
        return false;
    }

    return true;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor (
        private readonly _errorTypeConverter: ErrorTypeConverter,
    ) {
    }

    catch (exception: unknown, host: ArgumentsHost) {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (isErrorResponseType(exception)) {
            const code: HttpStatus = this._errorTypeConverter.to(exception.code);
            response
                .status(code)
                .json({
                    errors: exception.errors,
                });
        } else if (isHttpExceptionError(exception)) {
            const code: HttpStatus = this._errorTypeConverter.to(exception.getStatus());
            response
                .status(code)
                .json({
                    errors: [
                        {
                            target  : '',
                            messages: exception.getResponse(),
                        },
                    ],
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