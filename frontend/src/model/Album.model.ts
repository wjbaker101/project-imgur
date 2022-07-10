import { Dayjs } from 'dayjs';

import { IImageLink } from '@/model/ImageLink.model';

export interface IAlbum {
    id: string;
    title: string;
    imageCount: number;
    link: string;
    createdAt: Dayjs;
    coverImage: IImageLink;
}