using System.Text.Json.Serialization;

namespace Api.Clients.Imgur.ApiTypes;

public sealed class ImgurApiAlbum
{
    public string Id { get; init; } = null!;

    public string Title { get; init; } = null!;

    [JsonPropertyName("images_count")]
    public int ImageCount { get; init; }

    public string Link { get; init; } = null!;

    [JsonPropertyName("datetime")]
    public long CreatedAt { get; init; }

    [JsonPropertyName("cover")]
    public string? CoverImageId { get; init; }

    public List<ImgurApiImage>? Images { get; init; }
}