import { IState, IStateAlbums } from '@frontend/interface/IState';
import { IAuth } from '@frontend/interface/IAuth';

import { CacheService } from '@frontend/service/CacheService';
import { IImgurAlbum } from '@common/interface/IImgurAlbum';

const CACHE_KEY_AUTH = 'cache-state-auth';

export const appState: IState = {
    async init() {
        this.auth = await CacheService.get(CACHE_KEY_AUTH);
    },

    auth: null,

    setAuth(auth: IAuth): void {
        this.auth = auth;

        (() => { CacheService.set(CACHE_KEY_AUTH, this.auth) })();
    },

    albums: null,

    setAlbums(albums: IStateAlbums): void {
        this.albums = albums;
    },

    album: null,

    setAlbum(album: IImgurAlbum): void {
        this.album = album;
    },
};
