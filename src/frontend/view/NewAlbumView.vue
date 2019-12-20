<template>
    <div class="new-album-view">
        <div class="title-container">
            <h1>Create a New Album</h1>
        </div>
        <div class="view-content">
            <label>Title</label>
            <input v-model="titleInputValue" type="text">
            <p></p>
            <label>Description</label>
            <input v-model="descriptionInputValue" type="text">
            <p></p>
            <label>Images</label>
            <input type="checkbox" v-model="showPreviewImage"> Show Preview Image
            <DropZoneComponent class="image-drop-zone" @drop="onDrop">
                <div class="upload-image-component" :key="index" v-for="(image, index) in displayedImages">
                    <div class="preview" v-if="showPreviewImage">
                        <img :src="image">
                    </div>
                    <div class="link">
                        {{ image }}
                    </div>
                    <div class="remove" @click="removeImage(index)">
                        <CloseIcon />
                    </div>
                </div>
            </DropZoneComponent>
            <p></p>
            <button @click="createAlbum">Create Album</button>
            <p>{{ uploadStageMessage }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import DropZoneComponent from '@frontend/component/DropZoneComponent.vue';

    import CloseIcon from '@frontend/assets/icon/times.svg';

    import { ImgurClient } from '@frontend/client/ImgurClient';

    export default Vue.extend({
        name: 'NewAlbumView',

        components: {
            DropZoneComponent,
            CloseIcon,
        },

        data() {
            return {
                uploadImages: [] as string[],
                uploadStage: 0,
                imagesUploaded: 0,
                showPreviewImage: true,
                titleInputValue: '',
                descriptionInputValue: '',
            }
        },

        computed: {
            displayedImages(): string[] {
                return this.uniqueList(this.uploadImages);
            },

            uploadStageMessage(): string {
                return [
                    'If there are many images this may take a while. Please do not refresh.',
                    'Creating your new album.',
                    `Uploading images and adding to the album. Finished ${this.imagesUploaded} of ${this.uploadImages.length}.`,
                    'Completed album creating, redirecting you!',
                ][this.uploadStage];
            },
        },

        methods: {
            onDrop(data: string): void {
                this.uploadImages.push(data);
            },

            uniqueList(list: string[]): string[] {
                return Array.from(new Set(list));
            },

            removeImage(index: number): void {
                this.uploadImages.splice(index, 1);
            },

            async createAlbum(): Promise<void> {
                if (!this.doInputValidation()) {
                    return;
                }

                this.uploadStage = 1;

                const result = await ImgurClient.createAlbum(this.titleInputValue, this.descriptionInputValue, []);

                if (result instanceof Error) {
                    return;
                }

                this.uploadStage = 2;
                this.imagesUploaded = 0;

                const imageUploadRequests = this.uploadImages.map(async (image: string) => {
                    await ImgurClient.uploadImageByURL(image, result.id, '', '');
                    ++this.imagesUploaded;
                });

                await Promise.all(imageUploadRequests);

                this.uploadStage = 3;

                this.$router.push({ path: `/album/${result.id}` });
            },

            doInputValidation(): boolean {
                if (this.titleInputValue.length === 0) {
                    return false;
                }

                return true;
            },
        },
    })
</script>

<style lang="scss">
    .new-album-view {

        .view-content {
            padding: 1rem;
        }

        .title-container {
            padding: 1rem;
            border-bottom: 4px double theme(bg-light);
        }


        .image-drop-zone {
            min-height: 18rem;
            max-height: 36rem;
            overflow-y: auto;
            border: 4px double theme(bg-light);
            transition: border-color 0.5s;

            &.is-drag {
                border-color: theme(primary);
            }
        }

        .upload-image-component {
            padding: 0.5rem;
            display: flex;

            & + .upload-image-component {
                border-top: 1px solid theme(bg-light);
            }

            .preview {
                width: 8rem;
                height: 8rem;
                display: flex;
                margin: auto 0;
                text-align: center;

                img {
                    max-width: 100%;
                    max-height: 100%;
                    margin: auto;
                }
            }

            .link {
                flex: 1;
                margin: auto 0;
                margin-left: 1rem;
            }

            .remove {
                margin: auto 0;
                padding: 0.5rem;
                cursor: pointer;
                opacity: 0.2;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
</style>