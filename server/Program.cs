using Microsoft.AspNetCore.Mvc;
using server;

var game = new Game();
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.AddSingleton(game);
builder.Services.AddSingleton<SignalrHub>();

var app = builder.Build();
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials());

app.MapHub<SignalrHub>("/hub");

app.MapGet("/game", () => game);
app.MapGet("/reset", ([FromServices] SignalrHub signalrHub) =>
{
    game.Reset();
    signalrHub.GetGame();

    return game;
});
app.MapGet("/set-tile",
    ([FromServices] SignalrHub signalrHub, int x, int y, int? player) =>
    {
        game.SetTile(x, y, player);
        signalrHub.GetGame();

        return game;
    });

app.Run();