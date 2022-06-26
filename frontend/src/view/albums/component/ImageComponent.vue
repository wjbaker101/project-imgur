<template>
    <div class="image-component flex-auto bordered hoverable">
        <img :src="url">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ImageComponent',

    props: {
        url: String,
    },

    setup() {},
});
</script>

<style lang="scss">
@use '@/styling/variables' as *;

.image-component {
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