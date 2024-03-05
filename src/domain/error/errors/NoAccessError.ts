import { ErrorCode, ErrorType } from '@vanyamate/cur-helper-types';


export const NoAccessError: ErrorType = (...messages: string[]) => {
    return {
        messages,
        code: ErrorCode.NO_ACCESS,
    };
};