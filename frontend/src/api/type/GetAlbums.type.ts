export interface IGetAlbumsResponse {
    albums: Array<ApiAlbum>;
}

interface ApiAlbum {
    id: string;
    title: string;
    imageCount: number;
    link: string;
    createdAt: string;
    coverImage: ApiImage;
}

interface ApiImage {
    id: string;
    doesExist: boolean;
    originalLink: string;
    thumbnailLink: string;
}