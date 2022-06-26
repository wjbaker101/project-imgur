<template>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from '@/use/auth.use';

export default defineComponent({
    name: 'LoginView',

    setup() {
        const auth = useAuth();
        const router = useRouter();

        onBeforeMount(() => {
            const parameters: Record<string, string> = {};

            window.location.hash
                .substring(1)
                .split('&')
                .forEach(param => {
                    const [ key, value ] = param.split('=');

                    parameters[decodeURIComponent(key)] = decodeURIComponent(value);
                });

            auth.set({
                accessToken: parameters['access_token'],
                expiresIn: Number(parameters['expires_in']),
                tokenType: parameters['token_type'] as 'bearer',
                refreshToken: parameters['refresh_token'],
                accountUsername: parameters['account_username'],
                accountId: Number(parameters['account_id']),
            });

            router.push({ path: '/' });
        });
    },
});
</script>

<style lang="scss">
</style>