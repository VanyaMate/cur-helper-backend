import { ErrorCode, ErrorMessageType, ErrorType } from '@vanyamate/cur-helper-types';


export const NotFoundError: ErrorType = (errors: ErrorMessageType[]) => {
    return {
        errors,
        code: ErrorCode.NOT_FOUND,
    };
};