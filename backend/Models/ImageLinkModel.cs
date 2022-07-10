namespace Models;

public sealed class ImageLinkModel
{
    private const string BASE_URL = "https://i.imgur.com";

    public string Id { get; } = "";
    public bool DoesExist { get; }
    public string OriginalLink { get; } = "";
    public string ThumbnailLink { get; } = "";

    public ImageLinkModel(string? id)
    {
        if (id == null)
        {
            DoesExist = false;
            return;
        }

        DoesExist = true;
        Id = id;
        OriginalLink = $"{BASE_URL}/{Id}.jpg";
        ThumbnailLink = $"{BASE_URL}/{Id}b.jpg";
    }
}