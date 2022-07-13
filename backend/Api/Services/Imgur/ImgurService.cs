using Api.Clients.Imgur;
using Api.Services.Imgur.Types;
using Models;
using NetApiLibs.Type;

namespace Api.Services.Imgur;

public interface IImgurService
{
    Result<GetAlbumsResponse> GetAlbums(string username, string accessToken);
    Result<GetAlbumResponse> GetAlbum(string username, string albumId, string accessToken);
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

    public Result<GetAlbumResponse> GetAlbum(string username, string albumId, string accessToken)
    {
        var albumResult = _imgurClient.GetAlbum(accessToken, username, albumId);
        if (!albumResult.TrySuccess(out var album))
            return Result<GetAlbumResponse>.FromFailure(albumResult);

        return new GetAlbumResponse
        {
            Album = new AlbumModel
            {
                Id = album.Id,
                Title = album.Title,
                CreatedAt = DateTimeOffset.FromUnixTimeSeconds(album.CreatedAt).DateTime,
                ImageCount = album.ImageCount,
                Link = album.Link,
                CoverImage = new ImageLinkModel(album.CoverImageId),
                Images = album.Images?.ConvertAll(x => new ImageModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    CreatedAt = DateTimeOffset.FromUnixTimeSeconds(x.CreatedAt).DateTime,
                    Width = x.Width,
                    Height = x.Height,
                    FileSize = x.FileSize,
                    DeleteHash = x.DeleteHash
                })
            }
        };
    }
}