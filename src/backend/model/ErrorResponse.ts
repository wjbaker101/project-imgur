import IErrorResponse from '../interface/IErrorResponse';

export const ErrorResponse = {

    create(message: string): IErrorResponse {
        return {
            message,
            timestamp: Date.now(),
        }
    },
}
