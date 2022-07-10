using Api.Clients.Imgur;
using Api.Core;
using Api.Services.Imgur;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

HttpClientHelper.Setup(builder.Services);

builder.Services.AddSingleton<IImgurClient, ImgurClient>();

builder.Services.AddSingleton<IImgurService, ImgurService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();