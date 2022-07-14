<template>
    <div class="album-image-component flex-auto bordered hoverable" :title="image.title ?? ''">
        <div>
            <img width="160" height="160" :src="image.image.thumbnailLink">
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { IImage } from '@/model/Image.model';

defineProps({
    image: {
        type: Object as PropType<IImage>,
        required: true,
    },
});
</script>

<style lang="scss">
@use '@/styling/variables' as *;

.album-image-component {
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