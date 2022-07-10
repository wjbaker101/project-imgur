using Microsoft.AspNetCore.Mvc;
using NetApiLibs.Api;

namespace Api.Services.Imgur;

[Route("api/{username}")]
public sealed class ImgurController : ApiController
{
    private readonly IImgurService _imgurService;

    public ImgurController(IImgurService imgurService)
    {
        _imgurService = imgurService;
    }

    [Route("albums")]
    public IActionResult GetAlbums([FromRoute] string username, [FromHeader(Name = "access_token")] string accessToken)
    {
        var result = _imgurService.GetAlbums(username, accessToken);

        return ToApiResponse(result);
    }
}