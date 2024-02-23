using Microsoft.AspNetCore.SignalR;

namespace server;

public class SignalrHub(Game game) : Hub
{
    public async Task GetGame()
    {
        await Clients.All.SendAsync("setGame", game);
    }

    public Task SetTile(int x, int y, int? player)
    {
        game.SetTile(x, y, player);
        return GetGame();
    }

    public Task Reset()
    {
        game.Reset();
        return GetGame();
    }
}