namespace Models;

public sealed class ImageModel
{
    public string Id { get; init; } = null!;
    public string? Title { get; init; }
    public string? Description { get; init; }
    public DateTime CreatedAt { get; init; }
    public int Width { get; init; }
    public int Height { get; init; }
    public int FileSize { get; init; }
    public string DeleteHash { get; init; } = null!;
}