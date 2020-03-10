import { Request, Response } from 'express';

import { ImgurService } from '../service/ImgurService'
import { ResponseHelper } from '../helper/ResponseHelper';

export const ImgurController = {

    async getAlbums(request: Request, response: Response): Promise<void> {
        const { page, username, accessToken } = request.query;

        const result = await ImgurService.getAlbums(
                Number(page), username, accessToken);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, result.message);

            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },

    async getAlbum(request: Request, response: Response): Promise<void> {
        const { albumID, username, accessToken } = request.query;

        const result = await ImgurService.getAlbum(
                albumID, username, accessToken);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, result.message);

            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },

    async getAlbumImages(request: Request, response: Response): Promise<void> {
        const { albumID } = request.params;
        const { username, accessToken } = request.query;

        const result = await ImgurService.getAlbumImages(
                albumID, username, accessToken);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, result.message);

            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },

    async createAlbum(request: Request, response: Response): Promise<void> {
        const { title, description, images, accessToken } = request.body;

        const _images = images ? images.split(',') : [];

        const result = await ImgurService.createAlbum(
                title, description, _images, accessToken);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, result.message);

            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },

    async updateAlbum(request: Request, response: Response): Promise<void> {
        const {
            albumID,
            title,
            description,
            privacy,
            cover,
            accessToken
        } = request.body;

        const result = await ImgurService.updateAlbum(
                albumID,
                title,
                description,
                privacy,
                cover,
                accessToken);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, result.message);

            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },

    async uploadImageByURL(request: Request, response: Response):
            Promise<void> {

        const {
            imageData,
            albumID,
            title,
            description,
            accessToken
        } = request.body;

        const result = await ImgurService.uploadImageByURL(
            imageData,
            albumID,
            title,
            description,
            accessToken);

        if (result instanceof Error) {
            ResponseHelper(response).sendError(400, result.message);

            return;
        }

        ResponseHelper(response).sendEntity(200, result);
    },
}
