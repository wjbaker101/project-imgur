import { ImmortalDB } from 'immortal-db';

import { ICache } from '@frontend/interface/ICache';

export const CacheService = {

    async get<T = any>(key: string): Promise<T | null> {
        const cache = await this.getRaw(key);

        if (cache === null) {
            return null;
        }

        return cache.data;
    },

    async getRaw(key: string): Promise<ICache | null> {
        const cache = await ImmortalDB.get(key);

        if (cache === null) {
            return null;
        }

        return JSON.parse(cache);
    },

    async set(key: string, data: any): Promise<void> {
        await ImmortalDB.set(key, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    },

    async hasExpiredOrNull(key: string, expiry: number): Promise<boolean> {
        const cache = await this.get(key);

        if (cache === null) {
            return true;
        }

        return cache.timestamp + expiry < Date.now();
    },
}
