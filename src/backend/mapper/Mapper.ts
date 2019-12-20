import { IImgurAlbum } from '../../common/interface/IImgurAlbum';
import { IImgurImage } from '../../common/interface/IImgurImage';

import { IImgurAlbumResponse } from '../interface/response/IImgurAlbumResponse';
import { IImgurImageResponse } from '../interface/response/IImgurImageResponse';

export const ImgurAlbumMapper = {
    map(album: IImgurAlbumResponse): IImgurAlbum {
        const {
            id,
            title,
            description,
            link,
            datetime: creationDate,
            cover: coverImageID,
            favorite: favourite,
            images_count: length,
            privacy,
            views,
            nsfw,
            deletehash,
            images,
        }= album;

        return {
            id,
            title,
            description,
            link,
            creationDate: creationDate * 1000,
            coverImageID,
            favourite,
            length,
            privacy,
            views,
            nsfw,
            deletehash,
            images: images ? images.map(ImgurImageMapper.map) : undefined,
        }
    },
}

export const ImgurImageMapper = {
    map(album: IImgurImageResponse): IImgurImage {
        const {
            id,
            title,
            description,
            datetime: creationDate,
            type,
            animated,
            width,
            height,
            size,
            views,
            deletehash,
            link,
            favorite: favourite,
            nsfw,
        }= album;

        return {
            id,
            title,
            description,
            creationDate: creationDate * 1000,
            type,
            animated,
            width,
            height,
            size,
            views,
            deletehash,
            link,
            favourite,
            nsfw,
        }
    },
}
