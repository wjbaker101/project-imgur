<template>
    <div class="album-view">
        <DropZoneComponent
                class="images-container"
                :class="{ 'is-select-cover-mode': isSelectCoverImageMode }"
                @drop="onImageUpload">
            <div class="images-list">
                <ImageComponent
                        :key="index"
                        v-for="(image, index) in album.images"
                        :class="{ 'is-cover': album.coverImageID === image.id }"
                        :image="image"
                        @click.native="onImageClick(image)" />
            </div>
        </DropZoneComponent>
        <div class="controls-container">
            <div class="album-id">
                <strong>{{ album.id }}</strong>
                <span class="image-count">{{ album.length }}</span>
            </div>
            <div class="controls">
                <span class="control-link" @click="isSelectCoverImageMode = !isSelectCoverImageMode">Change Cover Image</span>
            </div>
            <div class="delete-album">
                Delete Album
            </div>
        </div>
        <div class="preview-container" :class="{ 'is-shown': isPreviewImageShown }" @click.self="togglePreview(false)">
            <div class="close-preview" @click.self="togglePreview(false)" @keyup="onKeyUp">
                <CloseIcon />
            </div>
            <img :src="previewImage">
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { ImgurClient } from '@frontend/client/ImgurClient';
    import { appState } from '@frontend/state/AppState';

    import { IImgurImage } from '@common/interface/IImgurImage';
    import { IImgurAlbum } from '@common/interface/IImgurAlbum';

    import ImageComponent from '@frontend/component/ImageComponent.vue';
    import DropZoneComponent from '@frontend/component/DropZoneComponent.vue';

    import CloseIcon from '@frontend/assets/icon/times.svg';

    const KEY_RIGHT = 'ArrowRight';
    const KEY_LEFT = 'ArrowLeft';
    const KEY_SPACE = ' ';
    const KEY_ESCAPE = 'Escape';

    export default Vue.extend({
        name: 'AlbumView',

        components: {
            ImageComponent,
            DropZoneComponent,
            CloseIcon,
        },

        data() {
            return {
                album: {},
                previewImage: '',
                isPreviewImageShown: false,
                selectedIndex: null as (number | null),
                isSlideshowEnabled: false,
                isSelectCoverImageMode: false,
            }
        },

        created(): void {
            document.addEventListener('keyup', this.onKeyUp);
        },

        beforeDestroy(): void {
            document.removeEventListener('keypress', this.onKeyUp);
        },

        async mounted(): Promise<void> {
            const { albumID } = this.$route.params;

            if (appState.album !== null && appState.album.id === albumID) {
                this.album = appState.album;

                return;
            }

            const album = await ImgurClient.getAlbum(albumID);

            if (album instanceof Error) {
                return;
            }

            this.album = album;

            appState.setAlbum(this.album);
        },

        methods: {
            async onImageClick(image: IImgurImage): Promise<void> {
                if (this.isSelectCoverImageMode) {
                    const result = await ImgurClient.updateAlbum(
                            this.album.id, '', '', '', image.id);

                    if (result === true) {
                        this.album.coverImageID = image.id;
                        this.isSelectCoverImageMode = false;

                        if (appState.albums) {
                            const album = appState.albums.albums
                                    .find(a => a.id === this.album.id);

                            if (album) {
                                album.coverImageID = image.id;
                            }
                        }
                    }
                }
                else {
                    this.displayImage(image);
                }
            },

            displayImage(image: IImgurImage): void {
                this.isPreviewImageShown = true;

                this.selectedIndex = this.album.images
                        .findIndex((i: IImgurImage) => i.id === image.id);

                this.previewImage = image.link;
            },

            togglePreview(toggle: boolean): void {
                this.isPreviewImageShown = toggle;

                if (!toggle) {
                    this.isSlideshowEnabled = false;
                }
            },

            onKeyUp(event: KeyboardEvent): void {
                if (event.key === KEY_RIGHT) {
                    if (this.selectedIndex + 1 < this.album.images.length) {
                        this.displayImage(this.album.images[this.selectedIndex + 1]);
                    }
                }

                if (event.key === KEY_LEFT) {
                    if (this.selectedIndex - 1 > -1) {
                        this.displayImage(this.album.images[this.selectedIndex - 1]);
                    }
                }

                if (event.key === KEY_SPACE) {
                    if (this.isSlideshowEnabled) {
                        this.isSlideshowEnabled = false;

                        return;
                    }

                    this.isSlideshowEnabled = true;
                    this.doSlideshow();
                }

                if (event.key === KEY_ESCAPE) {
                    this.togglePreview(false);
                }
            },

            doSlideshow(): void {
                const randomIndex = Math.floor(Math.random() * this.album.images.length);

                const nextImage = this.album.images[randomIndex];

                const loadedImage = new Image();

                loadedImage.onload = () => {
                    this.displayImage(nextImage);

                    if (this.isSlideshowEnabled) {
                        setTimeout(() => {
                            if (this.isSlideshowEnabled) {
                                this.doSlideshow();
                            }
                        }, 5000);
                    }
                };

                loadedImage.src = nextImage.link;
            },

            async onImageUpload(imageURL: string): Promise<void> {
                const result = await ImgurClient.uploadImageByURL(imageURL, this.album.id, '', '');

                if (result instanceof Error) {
                    return;
                }

                this.album.images.push(result);
                this.album.length++;

                if (appState.albums) {
                    const album = appState.albums.albums
                            .find(a => a.id === this.album.id);

                    if (album) {
                        if (album.images) {
                            album.images.push(result);
                            album.length++;
                        }
                        else {
                            album.images = [result];
                            album.length = 1;
                        }
                    }
                }
            },
        },
    })
</script>

<style lang="scss">
    .album-view {
        display: flex;
        flex-direction: column;

        .images-container {
            position: relative;
            height: 100%;
            align-items: start;
            overflow-y: auto;

            &.is-drag {
                & > * {
                    pointer-events: none;
                }
            }

            &.is-select-cover-mode {
                & > * {
                    opacity: 0.4;

                    &:hover,
                    &.is-cover {
                        opacity: 1;
                        border-color: theme(primary);
                    }
                }
            }

            .image-upload-container {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: -1;
            }
        }

        .images-list {
            display: grid;
            padding: 1rem;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .controls-container {
            display: flex;
            padding: 1rem;
            border-top: 4px double theme(bg-light);

            & > * {
                flex: 0 0 auto;
                display: inline-block;

                & + * {
                    margin-left: 1rem;
                    padding-left: 1rem;
                    border-left: 1px solid theme(bg-light);
                }
            }

            .controls {
                flex: 1;
            }

            .delete-album {
                color: theme(danger);
                cursor: pointer;
            }

            .image-count {
                display: inline-block;
                padding: 0 0.5rem;
                background-color: theme(bg-light);
                margin-left: 0.5rem;
            }

            .control-link {
                color: theme(primary);
                cursor: pointer;
                transition: color 0.2s;

                &:hover {
                    color: theme(primary-dark);
                }
            }
        }

        .preview-container {
            padding: 0.5rem;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            background-color: theme(bg-dark);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s;

            &.is-shown {
                opacity: 1;
                pointer-events: all;

                img {
                    transform: translateY(0);
                }
            }

            img {
                max-width: 100%;
                max-height: 100%;
                margin: auto;
                transform: translateY(5rem);
                transition: transform 0.5s;
            }

            .close-preview {
                position: fixed;
                top: 0.5rem;
                right: 0.5rem;
                display: inline-block;
                padding: 0.5rem;
                background-color: theme(bg);
                border: 4px double theme(bg-light);
                cursor: pointer;
                opacity: 0.2;
                z-index: 2;

                &:hover {
                    opacity: 1;
                }

                * {
                    pointer-events: none;
                }
            }
        }
    }
</style>