import { ErrorMessageType, IErrorCaller } from '@vanyamate/cur-helper-types';
import { NotFoundError } from '@/domain/error/errors/NotFoundError';
import { NoValidDataError } from '@/domain/error/errors/NoValidDataError';
import { NoAccessError } from '@/domain/error/errors/NoAccessError';
import { ErrorResponseType } from '@vanyamate/cur-helper-types/types/error';


export class ErrorCaller implements IErrorCaller {
    notFound (errors: ErrorMessageType[]): ErrorResponseType {
        return NotFoundError(errors);
    }

    noValidData (errors: ErrorMessageType[]): ErrorResponseType {
        return NoValidDataError(errors);
    }

    noAccess (errors: ErrorMessageType[]): ErrorResponseType {
        return NoAccessError(errors);
    }
}