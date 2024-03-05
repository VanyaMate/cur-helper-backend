import { ErrorCode, ErrorType } from '@vanyamate/cur-helper-types';


export const NotFoundError: ErrorType = (...messages: string[]) => {
    return {
        messages,
        code: ErrorCode.NOT_FOUND,
    };
};