import { readonly, ref } from 'vue';

import { useCache } from '@wjb/vue/use/cache.use';

const cache = useCache();
const authDetailsCacheKey = 'auth-details';

interface IAuthDetails {
    readonly accessToken: string;
    readonly expiresIn: number;
    readonly tokenType: 'bearer';
    readonly refreshToken: string;
    readonly accountUsername: string;
    readonly accountId: number;
}

const authDetails = ref<IAuthDetails | null>(cache.get(authDetailsCacheKey));

export const useAuth = function () {
    return {

        value: readonly(authDetails),

        set(newAuthDetails: IAuthDetails): void {
            authDetails.value = newAuthDetails;

            cache.set(authDetailsCacheKey, authDetails.value);
        },

        clear(): void {
            authDetails.value = null;

            cache.unset(authDetailsCacheKey);
        },

    };
};