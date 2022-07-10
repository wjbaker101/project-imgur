<template>
    <div class="album-component flex-auto bordered hoverable">
        <img v-if="album.coverImage.doesExist" :src="album.coverImage.thumbnailLink">
        <div v-else class="no-cover-image flex">
            <div class="no-cover-image-inner text-centered flex-auto">
                <IconComponent icon="image" size="large" />
                <br>
                <small>No Cover Image</small>
            </div>
        </div>
    </div>
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

    & > img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        border-radius: $border-radius;
    }

    .no-cover-image {
        width: 160px;
        height: 160px;
    }

    .no-cover-image-inner {
        margin: auto;
    }
}
</style>