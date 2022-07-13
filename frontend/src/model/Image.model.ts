import { Dayjs } from 'dayjs';

import { IImageLink } from '@/model/ImageLink.model';

export interface IImage {
    id: string;
    title: string | null;
    description: string | null;
    createdAt: Dayjs;
    width: number;
    height: number;
    fileSize: number;
    deleteHash: string;
    image: IImageLink;
}