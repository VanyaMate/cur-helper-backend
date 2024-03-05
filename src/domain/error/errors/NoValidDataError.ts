import { ErrorCode, ErrorMessageType, ErrorType } from '@vanyamate/cur-helper-types';


export const NoValidDataError: ErrorType = (errors: ErrorMessageType[]) => {
    return {
        errors,
        code: ErrorCode.NO_VALID_DATA,
    };
};