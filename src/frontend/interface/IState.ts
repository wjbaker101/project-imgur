import { IAuth } from '@frontend/interface/IAuth';
import { IImgurAlbum } from '@common/interface/IImgurAlbum';

export interface IStateAlbums {
    albums: IImgurAlbum[],
    page: number,
}

export interface IState {
    init(): Promise<void>,

    auth: IAuth | null,
    setAuth(auth: IAuth): void,

    albums: IStateAlbums | null,
    setAlbums(albums: IStateAlbums): void,

    album: IImgurAlbum | null,
    setAlbum(album: IImgurAlbum): void,
}
