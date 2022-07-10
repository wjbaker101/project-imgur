<template>
    <div class="album-component flex-auto bordered hoverable">
        <img v-if="album.coverImage.doesExist" :src="album.coverImage.thumbnailLink">
        <div v-else>
            No cover image.
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
}
</style>