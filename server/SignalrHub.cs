using Microsoft.AspNetCore.SignalR;

public class SignalrHub(Game game) : Hub
{
    public async Task GetGame()
    {
        await Clients.All.SendAsync("setGame", game);
    }

    public async Task SetTile(int x, int y, int? player)
    {
        game.SetTile(x, y, player);
        await GetGame();
    }

    public async Task Reset()
    {
        game.Reset();
        await GetGame();
    }
}