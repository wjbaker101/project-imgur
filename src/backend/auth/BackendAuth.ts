import { Request, Response, NextFunction } from 'express';

import configSecret from '../../common/config/config-secret.json';
import { LoggingUtils } from '../util/LoggingUtils';
import { ResponseHelper } from '../helper/ResponseHelper';

const MESSAGE_ERROR_AUTH = 'Sorry, you are not authenticated to make this request.';

export const BackendAuth = {

    isAuthenticated(request: Request): boolean {
        return request.header('API-Key') === configSecret.backend.apiKey;
    },

    authenticate(
        request: Request,
        response: Response,
        next: NextFunction): void {

        if (request.header('API-Key') === configSecret.backend.apiKey) {
            next();
            return;
        }

        LoggingUtils.log('Authentication request failed');

        ResponseHelper(response).sendError(403, MESSAGE_ERROR_AUTH);
    },
}
