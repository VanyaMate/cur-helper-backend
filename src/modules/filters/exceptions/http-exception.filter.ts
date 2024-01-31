import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NOT_FOUND } from '@/domain/exceptions/errors';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch (exception: HttpException, host: ArgumentsHost) {
        const ctx          = host.switchToHttp();
        const response     = ctx.getResponse<Response>();
        const request      = ctx.getRequest<Request>();
        const message      = exception.getResponse();
        let status: number = HttpStatus.BAD_REQUEST;

        switch (message) {
            case NOT_FOUND:
                status = HttpStatus.NOT_FOUND;
                break;
            default:
        }


        response
            .status(status)
            .json({
                statusCode: status,
                message   : message,
                timestamp : new Date().toISOString(),
                path      : request.url,
            });
    }
}