import { ErrorCode, IConverter } from '@vanyamate/cur-helper-types';
import { HttpStatus } from '@nestjs/common';


export class ErrorToHttpConverter implements IConverter<ErrorCode, HttpStatus> {
    to (from: ErrorCode): HttpStatus {
        switch (from) {
            case ErrorCode.NO_ACCESS:
                return HttpStatus.FORBIDDEN;
            case ErrorCode.NO_VALID_DATA:
                return HttpStatus.BAD_REQUEST;
            case ErrorCode.NOT_FOUND:
                return HttpStatus.NOT_FOUND;
            default:
                return HttpStatus.NOT_FOUND;
        }
    }

    from (to: HttpStatus): ErrorCode {
        throw new Error('Method not implements');
    }
}