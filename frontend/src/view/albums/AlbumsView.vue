<template>
    <LoginZeroStateComponent v-if="authDetails === null" />
    <div v-else class="albums-view">
        <h2>Albums</h2>
        <div class="images-container flex gap-small">
            <AlbumComponent :key="album.id" v-for="album in albums" :album="album" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import LoginZeroStateComponent from '@/component/zero-state/LoginZeroStateComponent.vue';
import AlbumComponent from '@/view/albums/component/AlbumComponent.vue';

import { api } from '@/api/api';
import { useAuth } from '@/use/auth.use';

import { IAlbum } from '@/model/Album.model';

const auth = useAuth();

const authDetails = auth.value;

const albums = ref<Array<IAlbum> | null>(null);

onMounted(async () => {
    albums.value = null;

    const result = await api.getAlbums();
    if (result instanceof Error)
        return;

    albums.value = result;
});
</script>

<style lang="scss">
.albums-view {}
</style>