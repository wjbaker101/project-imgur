using Models;

namespace Api.Services.Imgur.Types;

public sealed class GetAlbumResponse
{
    public AlbumModel Album { get; init; } = new();
}