using Models;

namespace Api.Services.Imgur.Types;

public sealed class GetAlbumsResponse
{
    public List<AlbumModel> Albums { get; init; } = new();
}
