<template>
    <div class="album-view">
        <h1>Album: {{ albumId }}</h1>
        <small>{{ albumId }}</small>
    </div>
</template>

<script setup lang="ts">
import { api } from '@/api/api';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const albumId = route.params.albumId as string;

onMounted(async () => {
    const album = await api.getAlbum(albumId);

    console.log(album)
});
</script>

<style lang="scss">
.album-view {}
</style>