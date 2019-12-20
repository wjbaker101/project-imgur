<template>
    <router-link :to="albumURL">
        <div class="album-component">
            <div class="cover-container">
                <img class="album-cover" :src="albumCover">
            </div>
            <div class="album-details">
                <div class="title">
                    {{ album.title }}
                </div>
                <div class="image-count">
                    {{ album.length }}
                </div>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { ImgurClient } from '@frontend/client/ImgurClient';

    import { IImgurAlbum } from '@common/interface/IImgurAlbum';

    export default Vue.extend({
        name: 'AlbumComponent',

        props: {
            album: {
                type: Object as () => IImgurAlbum,
                required: true,
            },
        },

        computed: {
            albumURL(): string {
                return `/album/${this.album.id}`
            },

            albumCover(): string {
                return ImgurClient.getImageThumbnail(this.album.coverImageID);
            },
        },
    })
</script>

<style lang="scss">
    .album-component {
        border: 4px double theme(bg-light);
        text-align: center;

        &:hover {
            border-color: theme(primary);
        }

        .cover-container {
            padding: 0.5rem;
            display: flex;
            height: 150px;
        }

        .album-cover {
            max-width: 100%;
            max-height: 100%;
            margin: auto;
        }

        .album-details {
            padding: 0.5rem;
            display: flex;
            background-color: theme(bg-dark);
            border-top: 1px solid theme(bg-light);

            .title {
                flex: 1;
                padding-right: 0.5rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis
            }

            .image-count {
                flex: 0 0 auto;
                padding: 0 0.5rem;
                background-color: theme(bg-light);
            }
        }
    }
</style>