import express, { Request, Response, NextFunction } from 'express';

import { LoggingUtils } from '../util/LoggingUtils';
import { BackendAuth } from '../auth/BackendAuth';

const router = express.Router();

router.all('*', (request: Request, response: Response, next: NextFunction) => {
    const hasAuth = BackendAuth.isAuthenticated(request) ? 'Y' : 'N';

    LoggingUtils.log(`${request.method} (Auth:${hasAuth}): ${request.url}`);

    next();
});

export default router;
