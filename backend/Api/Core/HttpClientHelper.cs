namespace Api.Core;

public static class HttpClientHelper
{
    public const string IMGUR = "Imgur";

    public static void Setup(IServiceCollection services)
    {
        services.AddHttpClient(IMGUR, client =>
        {
            client.BaseAddress = new Uri("https://api.imgur.com/3/");
        });
    }
}