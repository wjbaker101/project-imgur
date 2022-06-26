import { readonly, ref } from 'vue';

interface IAuthDetails {
    readonly accessToken: string;
    readonly expiresIn: number;
    readonly tokenType: 'bearer';
    readonly refreshToken: string;
    readonly accountUsername: string;
    readonly accountId: number;
}

const authDetails = ref<IAuthDetails | null>(null);

export const useAuth = function () {
    return {

        value: readonly(authDetails),

        set(newAuthDetails: IAuthDetails): void {
            authDetails.value = newAuthDetails;
        },

        clear(): void {
            authDetails.value = null;
        },

    };
};