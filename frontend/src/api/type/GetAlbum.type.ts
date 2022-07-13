export interface IGetAlbumResponse {
    album: ApiAlbum;
}

interface ApiAlbum {
    id: string;
    title: string;
    imageCount: number;
    link: string;
    createdAt: string;
    coverImage: ApiImageLink;
    images: Array<ApiImage> | null;
}

interface ApiImageLink {
    id: string;
    doesExist: boolean;
    originalLink: string;
    thumbnailLink: string;
}

interface ApiImage {
    id: string;
    title: string | null;
    description: string | null;
    createdAt: string;
    width: number;
    height: number;
    fileSize: number;
    deleteHash: string;
    image: ApiImageLink;
}