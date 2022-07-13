import { Dayjs } from 'dayjs';

import { IImageLink } from '@/model/ImageLink.model';
import { IImage } from '@/model/Image.model';

export interface IAlbum {
    id: string;
    title: string;
    imageCount: number;
    link: string;
    createdAt: Dayjs;
    coverImage: IImageLink;
    images: Array<IImage> | null;
}