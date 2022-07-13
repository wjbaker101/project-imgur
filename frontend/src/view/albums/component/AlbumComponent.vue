<template>
    <router-link class="image-component flex-auto bordered hoverable" :to="`/album/${album.id}`">
        <div :title="album.title">
            <div>
                <img v-if="album.coverImage.doesExist" :src="album.coverImage.thumbnailLink">
                <div v-else class="no-cover-image flex">
                    <div class="no-cover-image-inner text-centered flex-auto">
                        <IconComponent icon="image" size="large" />
                        <br>
                        <small>No Cover Image</small>
                    </div>
                </div>
            </div>
            <div class="description flex gap-small">
                <div class="title">{{ album.title }}</div>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { IAlbum } from '@/model/Album.model';

defineProps({
    album: {
        type: Object as PropType<IAlbum>,
        required: true,
    },
});
</script>

<style lang="scss">
@use '@/styling/variables' as *;

.album-component {
    padding: 0.5rem;
    cursor: zoom-in;

    $image-size: 160px;

    img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        border-radius: $border-radius;
    }

    .no-cover-image {
        width: $image-size;
        height: $image-size;
    }

    .no-cover-image-inner {
        margin: auto;
    }

    .description {
        width: $image-size;
        margin-top: 0.25rem;

        .title {
            white-space: pre;
            overflow-x: hidden;
        }
    }
}
</style>