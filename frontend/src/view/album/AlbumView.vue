<template>
    <div class="album-view">
        <div class="flex align-items-center">
            <router-link class="back-to-albums flex-auto" to="/">
                <IconComponent icon="arrow-left" />
            </router-link>
            <h1 class="flex-auto align-items-center">
                <span v-if="album === null">Loading album...</span>
                <span v-else>{{ album.title }}</span>
            </h1>
        </div>
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
@use '@/styling/variables' as *;

.album-view {

    .back-to-albums {
        padding: 0.5rem;
        cursor: pointer;
        line-height: 1em;
        color: inherit;

        &:hover {
            color: $primary;
        }
    }

    .images-container {
        flex-wrap: wrap;
    }
}
</style>