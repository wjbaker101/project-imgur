namespace Models;

public sealed class AlbumModel
{
    public string Id { get; init; } = null!;
    public string Title { get; init; } = null!;
    public int ImageCount { get; init; }
    public string Link { get; init; } = null!;
    public DateTime CreatedAt { get; init; }
    public ImageLinkModel CoverImage { get; init; } = null!;
    public List<ImageModel>? Images { get; init; }
}