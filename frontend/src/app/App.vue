<template>
    <NavComponent />
    <router-view></router-view>
    <div class="flex-auto"></div>
</template>

<script setup lang="ts">
import NavComponent from '@/component/NavComponent.vue';
</script>

<style lang="scss">
@use '@/styling/variables' as *;

@import '~@wjb/styling/main';
@import '@/styling/main';

html,
body,
#app {
    height: 100%;
}

body {
    margin: 0;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6em;
    letter-spacing: 0.5px;
    background-color: $background;
    color: $foreground;
    transition: none;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    transition: all 0.2s;
}
</style>