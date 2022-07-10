using Api.Clients.Imgur.ApiTypes;
using Api.Core;
using NetApiLibs.Type;

namespace Api.Clients.Imgur;

public interface IImgurClient
{
    Result<List<ImgurApiAlbum>> GetAlbums(string accessToken, string username, int page);
}

public sealed class ImgurClient : IImgurClient
{
    private readonly HttpClient _httpClient;

    public ImgurClient(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient(HttpClientHelper.IMGUR);
    }

    private static HttpRequestMessage CreateRequest(HttpMethod method, string url, string accessToken)
    {
        var request = new HttpRequestMessage(method, url);
        request.Headers.Add("Authorization", $"Bearer {accessToken}");

        return request;
    }

    public Result<List<ImgurApiAlbum>> GetAlbums(string accessToken, string username, int page)
    {
        var request = CreateRequest(HttpMethod.Get, $"account/{username}/albums/{page}", accessToken);

        var rawResponse = _httpClient
            .SendAsync(request).Result.Content;

        var response = rawResponse
            .ReadFromJsonAsync<ImgurBaseResponse<List<ImgurApiAlbum>>>().Result;

        if (response == null)
            return Result<List<ImgurApiAlbum>>.Failure("Unable to retrieve albums from Imgur.");

        return response.Data;
    }
}