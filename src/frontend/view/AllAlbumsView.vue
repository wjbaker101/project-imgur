<template>
    <div class="all-albums-view">
        <div class="albums-container">
            <AlbumComponent
                    :key="index"
                    v-for="(album, index) in albums"
                    :album="album" />
        </div>
        <div class="load-more">
            <button @click="loadAlbums">Load More</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { ImgurClient } from '@frontend/client/ImgurClient';
    import { appState } from '@frontend/state/AppState';

    import { IImgurAlbum } from '@common/interface/IImgurAlbum';

    import AlbumComponent from '@frontend/component/AlbumComponent.vue';

    export default Vue.extend({
        name: 'AllAlbumsView',

        components: {
            AlbumComponent,
        },

        data() {
            return {
                albums: [] as IImgurAlbum[],
                page: -1,
            }
        },

        async mounted() {
            if (appState.albums !== null && appState.albums.albums.length > 0) {
                this.albums = appState.albums.albums;
                this.page = appState.albums.page

                return;
            }

            this.loadAlbums();
        },

        methods: {
            async loadAlbums() {
                const moreAlbums = await ImgurClient.getAlbums(++this.page);

                if (moreAlbums instanceof Error || moreAlbums.length === 0) {
                    return;
                }

                this.albums = this.albums.concat(moreAlbums);

                appState.setAlbums({
                    albums: this.albums,
                    page: this.page,
                });
            },
        },
    })
</script>

<style lang="scss">
    .all-albums-view {
        overflow-y: auto;

        .albums-container {
            padding: 1rem;
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            align-items: start;
        }

        .load-more {
            padding: 0 1rem 1rem 1rem;
        }
    }
</style>