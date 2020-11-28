<template>
    <div class="image-component" :class="{ 'is-loaded': isLoaded }">
        <div class="edit-description" @click.stop="onEditClick">
            Edit
        </div>
        <img :src="imageURL">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { IImgurImage } from '@common/interface/IImgurImage';

    import { ImgurClient } from '@frontend/client/ImgurClient';

    export default Vue.extend({
        name: 'ImageComponent',

        props: {
            image: {
                type: Object as () => IImgurImage,
                required: true,
            },
        },

        data() {
            return {
                imageURL: '',
                isLoaded: false,
                observer: null as (IntersectionObserver | null),
            }
        },

        mounted() {
            this.observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    this.loadImage();
                    this.observer.disconnect();
                }
            });

            this.observer.observe(this.$el);
        },

        methods: {
            loadImage() {
                const loadedImage = new Image();

                loadedImage.onload = () => {
                    this.imageURL = loadedImage.src;
                    this.isLoaded = true;
                };

                loadedImage.src = ImgurClient.getImageThumbnailLarge(this.image.id);
            },

            onEditClick() {
                this.$emit('edit', this.image);
            },
        },

        destroyed() {
            this.observer.disconnect();
        }
    })
</script>

<style lang="scss">
    .image-component {
        height: 250px;
        padding: 0.5rem;
        display: flex;
        position: relative;
        border: 4px double theme(bg-light);
        opacity: 0;
        cursor: zoom-in;
        pointer-events: none;
        transition: opacity 0.5s;

        &.is-loaded {
            height: auto;
            opacity: 1;
            pointer-events: all;
        }

        &:hover {
            border-color: theme(primary);

            .edit-description {
                opacity: 1;
            }
        }

        .edit-description {
            padding: 0 0.5rem;
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            opacity: 0;
        }

        img {
            max-width: 100%;
            max-height: 250px;
            margin: auto;
        }
    }
</style>