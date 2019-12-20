import axios, { AxiosResponse } from 'axios';

import configSecret from '@common/config/config-secret.json';

import { appState } from '@frontend/state/AppState';

import { IImgurAlbum } from '@common/interface/IImgurAlbum.js';
import { IResponseEntity } from '@common/interface/IResponseEntity';
import { IImgurImage } from '@common/interface/IImgurImage';
import { ICreatedAlbum } from '@common/interface/ICreatedAlbum';

const API = axios.create({
    baseURL: '/api',
    headers: {
        'API-Key': configSecret.backend.apiKey,
    },
});

export const ImgurClient = {

    async getAlbums(page: number): Promise<IImgurAlbum[] | Error> {
        const auth = appState.auth;

        if (auth === null) {
            return new Error('User has not been authenticated.');
        }

        const response: AxiosResponse<IResponseEntity<IImgurAlbum[]>>
                = await API.get('/album', {
                    params: {
                        page,
                        username: auth.username,
                        accessToken: auth.accessToken,
                    },
                });

        return response.data.result;
    },

    async getAlbum(albumID: string): Promise<IImgurAlbum | Error> {
        const auth = appState.auth;

        if (auth === null) {
            return new Error('User has not been authenticated.');
        }

        const response: AxiosResponse<IResponseEntity<IImgurAlbum>>
                = await API.get(`/album/${albumID}`, {
                    params: {
                        albumID,
                        username: auth.username,
                        accessToken: auth.accessToken,
                    },
                });

        return response.data.result;
    },

    async getAlbumImages(albumID: string): Promise<IImgurImage[] | Error> {
        const auth = appState.auth;

        if (auth === null) {
            return new Error('User has not been authenticated.');
        }

        const response: AxiosResponse<IResponseEntity<IImgurImage[]>>
                = await API.get(`/album/${albumID}/images`, {
                    params: {
                        username: auth.username,
                        accessToken: auth.accessToken,
                    },
                });

        return response.data.result;
    },

    async createAlbum(title: string, description: string, images: string[]):
            Promise<ICreatedAlbum | Error> {

        const auth = appState.auth;

        if (auth === null) {
            return new Error('User has not been authenticated.');
        }

        const response: AxiosResponse<IResponseEntity<ICreatedAlbum>>
                = await API.post('/album', {
                    title,
                    description,
                    images: images.join(','),
                    accessToken: auth.accessToken,
                });

        return response.data.result;
    },

    async updateAlbum(
            albumID: string,
            title: string,
            description: string,
            privacy: string,
            cover: string,):
            Promise<boolean | Error> {

        const auth = appState.auth;

        if (auth === null) {
            return new Error('User has not been authenticated.');
        }

        const response: AxiosResponse<IResponseEntity<boolean>>
                = await API.put('/album', {
                    albumID,
                    title,
                    description,
                    privacy,
                    cover,
                    accessToken: auth.accessToken,
                });

        return response.data.result;
    },

    async uploadImageByURL(
            imageData: string,
            albumID: string,
            title: string,
            description: string):
            Promise<IImgurImage | Error> {

        const auth = appState.auth;

        if (auth === null) {
            return new Error('User has not been authenticated.');
        }

        const response: AxiosResponse<IResponseEntity<IImgurImage>>
                = await API.post('/image', {
                    imageData,
                    albumID,
                    title,
                    description,
                    accessToken: auth.accessToken,
                });

        return response.data.result;
    },

    getImage(imageID: string): string {
        return `https://i.imgur.com/${imageID}.jpg`;
    },

    getImageThumbnail(imageID: string): string {
        return `https://i.imgur.com/${imageID}_d.jpg?maxwidth=300&shape=thumb&fidelity=high`;
    },

    getImageThumbnailLarge(imageID: string): string {
        return `https://i.imgur.com/${imageID}_d.jpg?maxwidth=520&shape=thumb&fidelity=high`;
    },
}
