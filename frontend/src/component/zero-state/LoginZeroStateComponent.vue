<template>
    <div class="login-zero-state-component flex">
        <div class="content flex-auto text-centered">
            <IconComponent icon="user" size="huge" />
            <p>You must be logged into Imgur to view albums/images.</p>
            <p>
                <a href="https://api.imgur.com/oauth2/authorize?client_id=199710cc77195d9&response_type=token">
                    <ButtonComponent class="primary">Log into Imgur</ButtonComponent>
                </a>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoginZeroStateComponent',

    setup() {},
});
</script>

<style lang="scss">
.login-zero-state-component {
    height: 100%;

    & > .content {
        margin: auto;
    }
}
</style>