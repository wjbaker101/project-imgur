export interface IImgurResponse<T = any> {
    data: T,
    status: number,
    success: boolean,
}
