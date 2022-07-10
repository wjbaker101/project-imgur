import { useAuth } from '@/use/auth.use';

import { IGetAlbumsResponse } from '@/api/type/GetAlbums.type';

const authData = useAuth();

const auth = authData.value;

export const api = {

    async getAlbums(): Promise<IGetAlbumsResponse | Error> {
        if (auth.value === null)
            return new Error('Must be logged in to do this.');

        try {
            const response = await fetch(`/api/${auth.value.accountUsername}/albums`, {
                headers: {
                    'access_token': auth.value.accessToken,
                },
            });

            const responseAsJson = (await response.json()) as IGetAlbumsResponse;

            return responseAsJson;
        }
        catch (error) {
            console.log(error);
            return new Error('Failed to retrieve albums, check console for errors.');
        }
    },

};