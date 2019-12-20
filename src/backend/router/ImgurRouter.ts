import express from 'express';

import { ImgurController } from '../controller/ImgurController';

const router = express.Router();

router.get('/album', ImgurController.getAlbums);
router.put('/album', ImgurController.updateAlbum);
router.post('/album', ImgurController.createAlbum);
router.get('/album/:albumID', ImgurController.getAlbum);
router.get('/album/:albumID/images', ImgurController.getAlbumImages);

router.post('/image', ImgurController.uploadImageByURL);

export default router;
