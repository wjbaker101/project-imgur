using Api.Clients.Imgur;
using Api.Services.Imgur.Types;
using Models;
using NetApiLibs.Type;

namespace Api.Services.Imgur;

public interface IImgurService
{
    Result<GetAlbumsResponse> GetAlbums(string username, string accessToken);
}

public sealed class ImgurService : IImgurService
{
    private readonly IImgurClient _imgurClient;

    public ImgurService(IImgurClient imgurClient)
    {
        _imgurClient = imgurClient;
    }

    public Result<GetAlbumsResponse> GetAlbums(string username, string accessToken)
    {
        var albumsResult = _imgurClient.GetAlbums(accessToken, username, 0);
        if (albumsResult.IsFailure)
            return Result<GetAlbumsResponse>.FromFailure(albumsResult);

        return new GetAlbumsResponse
        {
            Albums = albumsResult.Value.ConvertAll(x => new AlbumModel
            {
                Id = x.Id,
                Title = x.Title,
                CreatedAt = DateTimeOffset.FromUnixTimeSeconds(x.CreatedAt).DateTime,
                ImageCount = x.ImageCount,
                Link = x.Link,
                CoverImage = new ImageLinkModel(x.CoverImageId)
            })
        };
    }
}