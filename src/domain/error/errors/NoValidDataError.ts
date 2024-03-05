import { ErrorCode, ErrorType } from '@vanyamate/cur-helper-types';


export const NoValidDataError: ErrorType = (...messages: string[]) => {
    return {
        messages,
        code: ErrorCode.NO_VALID_DATA,
    };
};