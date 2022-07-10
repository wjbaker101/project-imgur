<template>
    <nav class="nav-component flex-auto">
        <h1>Project Imgur</h1>
    </nav>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@use '~@wjb/styling/variables' as *;
@use '@/styling/variables' as *;

.nav-component {
    padding: 0.5rem;
    background-color: $primary;
    border-right: 3px double $primary-dark;

    @include shadow-large();

    & > h1 {
        font-size: 0.8rem;
    }
}
</style>