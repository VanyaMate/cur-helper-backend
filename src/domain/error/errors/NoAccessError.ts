import { ErrorCode, ErrorMessageType, ErrorType } from '@vanyamate/cur-helper-types';


export const NoAccessError: ErrorType = (errors: ErrorMessageType[]) => {
    return {
        errors,
        code: ErrorCode.NO_ACCESS,
    };
};