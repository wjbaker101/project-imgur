<template>
    <header class="header-component gap flex bordered">
        <router-link v-if="backLink" class="back-link flex-auto" :to="backLink">
            <IconComponent icon="arrow-left" />
        </router-link>
        <h1 class="flex-auto">{{ title }}</h1>
        <div></div>
        <div class="flex-auto">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    backLink: {
        type: String,
        required: false,
    },
});
</script>

<style lang="scss">
@use '@/styling/variables' as *;

.header-component {
    padding: 1rem;
    margin: 1rem 0;

    .back-link {
        color: inherit;

        &:hover {
            color: $primary;
        }
    }

    h1 {
        margin: 0;
    }
}
</style>