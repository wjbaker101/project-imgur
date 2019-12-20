import { IImgurAuthResponse } from '@frontend/interface/IImgurAuthResponse';
import { IAuth } from '@frontend/interface/IAuth';

export const AuthMapper = {
    map(auth: IImgurAuthResponse): IAuth {
        const {
            account_id: accountID,
            account_username: username,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
            token_type: tokenType,
        } = auth;

        return {
            accountID,
            username,
            accessToken,
            refreshToken,
            expiresIn,
            tokenType,
        }
    },
}
