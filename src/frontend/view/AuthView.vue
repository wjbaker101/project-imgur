<template>
    <div class="auth-view">
        <p>Logging you in on our end! Please wait a couple of seconds.</p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { IImgurAuthResponse } from '@frontend/interface/IImgurAuthResponse';

    import { appState } from '@frontend/state/AppState';

    import { AuthMapper } from '@frontend/mapper/AuthMapper';

    export default Vue.extend({
        name: 'AuthView',

        created(): void {
            const params: any = {};

            location.hash.substring(1)
                    .split('&')
                    .forEach(param => {
                        const [ key, value ] = param.split('=');

                        params[decodeURIComponent(key)] = decodeURIComponent(value);
                    });

            appState.setAuth(AuthMapper.map(params));

            this.$router.push({ path: '/' });
        },
    })
</script>

<style lang="scss">

</style>