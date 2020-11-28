import { ImgurClient } from '../client/ImgurClient'
import { ImgurAlbumMapper, ImgurImageMapper } from '../mapper/Mapper';

import { IImgurAlbum } from '../../common/interface/IImgurAlbum';
import { IImgurImage } from '../../common/interface/IImgurImage';
import { ICreatedAlbum } from '../../common/interface/ICreatedAlbum';

export const ImgurService = {

    async getAlbums(page: number, username: string, accessToken: string):
            Promise<IImgurAlbum[] | Error> {

        const result = await ImgurClient.getAlbums(page, username, accessToken);

        if (result instanceof Error) {
            return result;
        }

        return result.data.map(ImgurAlbumMapper.map);
    },

    async getAlbum(albumID: string, username: string, accessToken: string):
            Promise<IImgurAlbum | Error> {

        const result = await ImgurClient.getAlbum(
                albumID, username, accessToken);

        if (result instanceof Error) {
            return result;
        }

        return ImgurAlbumMapper.map(result.data);
    },

    async getAlbumImages(
            albumID: string,
            username: string,
            accessToken: string):
            Promise<IImgurImage[] | Error> {

        const result = await ImgurClient.getAlbumImages(
                albumID,
                username,
                accessToken);

        if (result instanceof Error) {
            return result;
        }

        return result.data.map(ImgurImageMapper.map);
    },

    async createAlbum(
            title: string,
            description: string,
            images: string[],
            accessToken: string): Promise<ICreatedAlbum | Error> {

        const result = await ImgurClient.createAlbum(
            title,
            description,
            images,
            accessToken);

        if (result instanceof Error) {
            return result;
        }

        return result.data;
    },

    async updateAlbum(
            albumID: string,
            title: string,
            description: string,
            privacy: string,
            cover: string,
            accessToken: string): Promise<boolean | Error> {

        const result = await ImgurClient.updateAlbum(
            albumID,
            title,
            description,
            privacy,
            cover,
            accessToken);

        if (result instanceof Error) {
            return result;
        }

        return result.data;
    },

    async uploadImageByURL(
            imageData: string,
            albumID: string,
            title: string,
            description: string,
            accessToken: string): Promise<IImgurImage | Error> {

        const result = await ImgurClient.uploadImage(
            imageData,
            albumID,
            'URL',
            title,
            description,
            accessToken);

        if (result instanceof Error) {
            return result;
        }

        return ImgurImageMapper.map(result.data);
    },

    async updateImageDescription(
            imageID: string,
            description: string,
            accessToken: string): Promise<IImgurImage | Error> {

        const result = await ImgurClient.updateImageDescription(
                imageID,
                description,
                accessToken);

        if (result instanceof Error) {
            return result;
        }

        return ImgurImageMapper.map(result.data);
    },
}
