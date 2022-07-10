<template>
    <LoginZeroStateComponent v-if="authDetails === null" />
    <div v-else class="albums-view">
        <h2>Albums</h2>
        <div class="images-container flex gap-small">
            <AlbumComponent :key="album.id" v-for="album in albums" :album="album" />
        </div>
        <ModalComponent :style="'fullscreen'" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import ModalComponent from '@wjb/vue/component/ModalComponent.vue';
import { useModal } from '@wjb/vue/use/modal.use';

import LoginZeroStateComponent from '@/component/zero-state/LoginZeroStateComponent.vue';
import ImageComponent from '@/view/albums/component/ImageComponent.vue';
import ImageModalComponent from '@/view/albums/component/ImageModalComponent.vue';
import AlbumComponent from './component/AlbumComponent.vue';

import { api } from '@/api/api';
import { useAuth } from '@/use/auth.use';

import { IAlbum } from '@/model/Album.model';

export default defineComponent({
    name: 'AlbumsView',

    components: {
    ModalComponent,
    LoginZeroStateComponent,
    ImageComponent,
    AlbumComponent
},

    setup() {
        const auth = useAuth();
        const modal = useModal();

        const authDetails = auth.value;

        const images = [
            {
                url: 'https://i.imgur.com/SuEhwOQb.jpg',
            },
            {
                url: 'https://i.imgur.com/SuEhwOQb.jpg',
            },
        ];

        const albums = ref<Array<IAlbum> | null>(null);

        onMounted(async () => {
            albums.value = null;

            const result = await api.getAlbums();
            if (result instanceof Error)
                return;

            albums.value = result;
            console.log(albums.value)
        });

        return {
            authDetails,
            images,
            albums,

            onClick(i: string) {
                modal.show({
                    component: ImageModalComponent,
                    componentProps: {},
                });
                // useImageModal().show();
            },
        };
    },
});
</script>

<style lang="scss">
.albums-view {
    --wjb_modal-content-background-colour: #222;
}
</style>