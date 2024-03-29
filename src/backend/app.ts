import path from 'path';

import express, { Router } from 'express';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';

import { LoggingUtils } from './util/LoggingUtils';
import config from '../common/config/config.json';
import { BackendAuth } from './auth/BackendAuth';

import LogRouter from './router/LogRouter';
import ImgurRouter from './router/ImgurRouter';

const app = express();

app.use(LogRouter);

app.use(config.backend.prefix, BackendAuth.authenticate);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(history());

const routers: Router[] = [
    ImgurRouter,
];

routers.forEach(router => {
    app.use(config.backend.prefix, router);

    router.stack
            .filter(r => r && r.route && r.route.path)
            .map(r => r.route.path)
            .forEach(p => LoggingUtils.log(`Exposing endpoint: ${config.backend.prefix}${p}`));
});

app.use(express.static(path.join(__dirname, '../../src/frontend')));

export default app;
