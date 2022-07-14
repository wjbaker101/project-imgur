<template>
    <div class="album-view">
        <h1 class="flex-auto align-items-center">
            <span v-if="album === null">Loading album...</span>
            <span v-else>{{ album.title }}</span>
        </h1>
        <div v-if="album !== null" class="images-container gap-small flex flex-wrap">
            <AlbumImageComponent :key="image.id" v-for="image in album.images" :image="image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AlbumImageComponent from './component/AlbumImageComponent.vue';

import { api } from '@/api/api';

import { IAlbum } from '@/model/Album.model';

const route = useRoute();

const albumId = route.params.albumId as string;

const album = ref<IAlbum | null>(null);

onMounted(async () => {
    const getAlbumResult = await api.getAlbum(albumId);
    if (getAlbumResult instanceof Error)
        return;

    album.value = getAlbumResult;
});
</script>

<style lang="scss">
.album-view {

    .images-container {
        flex-wrap: wrap;
    }
}
</style>