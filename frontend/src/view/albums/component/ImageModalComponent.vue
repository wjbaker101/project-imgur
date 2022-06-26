<template>
    <div class="image-modal-component flex">
        <div class="content flex-auto">
            <img src="https://i.imgur.com/SuEhwOQ.jpg">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

let onShow = () => {};
let onHide = () => {};

export const useImageModal = function () {
    return {
        show() {
            onShow();
        },

        hide() {
            onHide();
        },
    };
};

export default defineComponent({
    name: 'ImageModalComponent',

    setup() {
        const isVisible = ref<boolean>(false);

        onMounted(() => {
            onShow = () => {
                isVisible.value = true;
            };

            onHide = () => {
                isVisible.value = false;
            };
        });

        return {
            isVisible,
        };
    },
});
</script>

<style lang="scss">
@use '~@wjb/styling/variables' as *;
@use '@/styling/variables' as *;

.image-modal-component {
    height: 100%;

    & > .content {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        border-radius: $border-radius;
        vertical-align: middle;
    }
}
</style>