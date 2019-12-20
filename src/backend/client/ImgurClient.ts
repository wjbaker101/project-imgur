import axios, { AxiosError } from 'axios';
import uuid from 'uuid/v4';
import FormData from 'form-data';

import configSecret from '../../common/config/config-secret.json';
import { IImgurResponse } from '../interface/IImgurResponse';
import { IImgurAlbumResponse } from '../interface/response/IImgurAlbumResponse.js';
import { IImgurImageResponse } from '../interface/response/IImgurImageResponse.js';

import { ICreatedAlbum } from '../../common/interface/ICreatedAlbum.js';

// https://apidocs.imgur.com/?version=latest

const imgurAPI = axios.create({
    baseURL: 'https://api.imgur.com/3',
    headers: {
        Authorization: `Client-ID ${configSecret.imgurAPI.clientID}`,
    },
});

export const ImgurClient = {

    async getAlbums(page: number, username: string, accessToken: string):
            Promise<IImgurResponse<IImgurAlbumResponse[]> | Error> {

        try {
            const url = `/account/${username}/albums/${page}`;

            const result = await imgurAPI.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return result.data;
        }
        catch (e) {
            return new Error('Unable to get albums of user.');
        }
    },

    async getAlbum(albumID: string, username: string, accessToken: string):
            Promise<IImgurResponse<IImgurAlbumResponse> | Error> {

        try {
            const url = `/account/${username}/album/${albumID}`;

            const result = await imgurAPI.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return result.data;
        }
        catch (e) {
            return new Error('Unable to get album.');
        }
    },

    async getAlbumImages(
            albumID: string,
            username: string,
            accessToken: string):
            Promise<IImgurResponse<IImgurImageResponse[]> | Error> {

        try {
            const url = `/account/${username}/album/${albumID}/images`;

            const result = await imgurAPI.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return result.data;
        }
        catch (e) {
            return new Error('Unable to get album images of user.');
        }
    },

    async createAlbum(
            title: string,
            description: string,
            images: string[],
            accessToken: string):
            Promise<IImgurResponse<ICreatedAlbum> | Error> {

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);

            if (images.length > 0) {
                formData.append('ids', images.join(','));
            }

            const result = await imgurAPI.post('/album', formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return result.data;
        }
        catch (e) {
            return new Error('Unable to create album.');
        }
    },

    async updateAlbum(
            albumID: string,
            title: string,
            description: string,
            privacy: string,
            cover: string,
            accessToken: string):
            Promise<IImgurResponse<boolean> | Error> {

        try {
            const formData = new FormData();

            if (title) formData.append('title', title);
            if (description) formData.append('description', description);
            if (privacy) formData.append('privacy', privacy);
            if (cover) formData.append('cover', cover);

            console.log(albumID);

            const url = `/album/${albumID}`;

            const result = await imgurAPI.post(url, formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return result.data;
        }
        catch (e) {
            return new Error('Unable to update album.');
        }
    },

    async uploadImage(
            imageData: string,
            albumID: string,
            type: string,
            title: string,
            description: string,
            accessToken: string):
            Promise<IImgurResponse<IImgurImageResponse> | Error> {

        try {
            const formData = new FormData();
            formData.append('image', imageData);
            formData.append('album', albumID);
            formData.append('type', type);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('name', `${uuid()}.jpg`);

            const result = await imgurAPI.post('/image', formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return result.data;
        }
        catch (e) {
            return new Error('Unable to create album.');
        }
    },
}
