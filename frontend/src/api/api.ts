import dayjs from 'dayjs';

import { useAuth } from '@/use/auth.use';

import { IAlbum } from '@/model/Album.model';
import { IGetAlbumsResponse } from '@/api/type/GetAlbums.type';

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

            const response = (await rawResponse.json()) as IGetAlbumsResponse;

            return response.albums.map(x => ({
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
            }));
        }
        catch (error) {
            console.log(error);
            return new Error('Failed to retrieve albums, check console for errors.');
        }
    },

};