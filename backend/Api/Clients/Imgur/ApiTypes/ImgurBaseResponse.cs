namespace Api.Clients.Imgur.ApiTypes;

public sealed class ImgurBaseResponse<T> where T : new()
{
    public T Data { get; init; } = default!;
    public int Status { get; init; }
    public bool Success { get; init; }
}