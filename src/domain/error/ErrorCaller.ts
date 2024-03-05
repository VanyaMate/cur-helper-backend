import { ErrorMessageType, IErrorCaller } from '@vanyamate/cur-helper-types';
import { NotFoundError } from '@/domain/error/errors/NotFoundError';
import { NoValidDataError } from '@/domain/error/errors/NoValidDataError';
import { NoAccessError } from '@/domain/error/errors/NoAccessError';


export class ErrorCaller implements IErrorCaller {
    notFound (...messages: string[]): ErrorMessageType {
        return NotFoundError(...messages);
    }

    noValidData (...messages: string[]): ErrorMessageType {
        return NoValidDataError(...messages);
    }

    noAccess (...messages: string[]): ErrorMessageType {
        return NoAccessError(...messages);
    }
}