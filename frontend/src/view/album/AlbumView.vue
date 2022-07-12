<template>
    <div class="album-view">
        <h1>Album: {{ albumId }}</h1>
        <small>{{ albumId }}</small>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const albumId = route.params.albumId as string;

onMounted(() => {});
</script>

<style lang="scss">
.album-view {}
</style>