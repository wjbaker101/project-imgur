import config from '../../common/config/config.json';
import dateformat from 'dateformat';

const DATE_FORMAT = 'ddd dS mmm yyyy, HH:MM:ss:l';

export const LoggingUtils = {

    log(message: string): void {
        if (config.backend.isLoggingEnabled) {
            const date = dateformat(new Date(), DATE_FORMAT);

            console.log(`[${date}] - ${message}`);
        }
    },
}
