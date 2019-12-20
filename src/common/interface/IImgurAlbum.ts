import { IImgurImage } from './IImgurImage';

export interface IImgurAlbum {
    id: string,
    title: string,
    description: string,
    link: string,
    creationDate: number,
    coverImageID: string,
    favourite: boolean,
    length: number,
    privacy: string,
    views: number,
    nsfw: boolean,
    deletehash: string,
    images?: IImgurImage[],
}
