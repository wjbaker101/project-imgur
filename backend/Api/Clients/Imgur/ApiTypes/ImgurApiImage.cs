using System.Text.Json.Serialization;

namespace Api.Clients.Imgur.ApiTypes;

public sealed class ImgurApiImage
{
    public string Id { get; init; }

    public string? Title { get; init; }

    public string? Description { get; init; }

    [JsonPropertyName("datetime")]
    public long CreatedAt { get; init; }

    public int Width { get; init; }

    public int Height { get; init; }

    [JsonPropertyName("size")]
    public int FileSize { get; init; }

    [JsonPropertyName("deletehash")]
    public string DeleteHash { get; init; }
}