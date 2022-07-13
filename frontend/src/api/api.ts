import dayjs from 'dayjs';

import { useAuth } from '@/use/auth.use';

import { IApiResponse } from '@/api/type/ApiResponse.type';

import { IAlbum } from '@/model/Album.model';
import { IGetAlbumsResponse } from '@/api/type/GetAlbums.type';
import { IGetAlbumResponse } from './type/GetAlbum.type';

const authData = useAuth();

const auth = authData.value;

export const api = {

    async getAlbums(): Promise<Array<IAlbum> | Error> {
        if (auth.value === null)
            return new Error('Must be logged in to do this.');

        try {
            const rawResponse = await fetch(`/api/${auth.value.accountUsername}/albums`, {
                headers: {
                    'access_token': auth.value.accessToken,
                },
            });

            const response = (await rawResponse.json()) as IApiResponse<IGetAlbumsResponse>;

            return response.result.albums.map(x => ({
                id: x.id,
                title: x.title,
                imageCount: x.imageCount,
                link: x.link,
                createdAt: dayjs(x.createdAt),
                coverImage: {
                    id: x.coverImage.id,
                    doesExist: x.coverImage.doesExist,
                    originalLink: x.coverImage.originalLink,
                    thumbnailLink: x.coverImage.thumbnailLink,
                },
                images: null,
            }));
        }
        catch (error) {
            console.log(error);
            return new Error('Failed to retrieve albums, check console for errors.');
        }
    },

    async getAlbum(albumId: string): Promise<IAlbum | Error> {
        if (auth.value === null)
            return new Error('Must be logged in to do this.');

        try {
            const rawResponse = await fetch(`/api/${auth.value.accountUsername}/album/${albumId}`, {
                headers: {
                    'access_token': auth.value.accessToken,
                },
            });

            const response = (await rawResponse.json()) as IApiResponse<IGetAlbumResponse>;

            const album = response.result.album;

            return {
                id: album.id,
                title: album.title,
                imageCount: album.imageCount,
                link: album.link,
                createdAt: dayjs(album.createdAt),
                coverImage: {
                    id: album.coverImage.id,
                    doesExist: album.coverImage.doesExist,
                    originalLink: album.coverImage.originalLink,
                    thumbnailLink: album.coverImage.thumbnailLink,
                },
                images: album.images?.map(image => ({
                    id: image.id,
                    title: image.title,
                    description: image.description,
                    createdAt: dayjs(image.createdAt),
                    width: image.width,
                    height: image.height,
                    fileSize: image.fileSize,
                    deleteHash: image.deleteHash,
                    image: {
                        id: image.image.id,
                        doesExist: image.image.doesExist,
                        originalLink: image.image.originalLink,
                        thumbnailLink: image.image.thumbnailLink,
                    },
                })) ?? null,
            };
        }
        catch (error) {
            console.log(error);
            return new Error(`Failed to retrieve album '${albumId}', check console for errors.`);
        }
    },

};