import { IImgurImageResponse } from './IImgurImageResponse';

export interface IImgurAlbumResponse {
    account_id: number,
    account_url: string,
    cover: string,
    cover_edited: number,
    cover_height: number,
    cover_width: number,
    datetime: number,
    deletehash: string,
    description: string,
    favorite: boolean,
    id: string,
    images_count: number,
    in_gallery: boolean,
    include_album_ads: boolean,
    is_ad: boolean,
    is_album: boolean,
    layout: string,
    link: string,
    nsfw: boolean,
    order: number,
    privacy: string,
    section: string,
    title: string,
    views: number,
    images?: IImgurImageResponse[],
}
