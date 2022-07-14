<template>
    <div class="album-view">
        <HeadingComponent back-link="/" :title="album === null ? 'Loading album...' : album.title">
            <template v-slot:right>
                <IconComponent icon="image" gap="right" />
                <span class="vertical-align-middle">{{ album?.imageCount }}</span>
            </template>
        </HeadingComponent>
        <div v-if="album !== null" class="images-container gap-small flex flex-wrap">
            <AlbumImageComponent :key="image.id" v-for="image in album.images" :image="image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AlbumImageComponent from './component/AlbumImageComponent.vue';
import HeadingComponent from '@/component/HeadingComponent.vue';

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