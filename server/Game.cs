namespace server;

public class Game
{
    public Game()
    {
        Reset();
    }

    public List<Tile> Tiles { get; set; } = new();
    public int? Winner { get; set; }
    public int Turn { get; set; } = 1;

    public Game Reset()
    {
        Tiles = [];
        for (var y = 0; y < 3; y++)
        for (var x = 0; x < 3; x++)
            Tiles.Add(new Tile(x, y));
        Winner = null;
        Turn = 1;

        return this;
    }

    private static void ValidateCoordinates(int x, int y)
    {
        if (x < 0 || x > 2 || y < 0 || y > 2) throw new Exception("Coordinates outside boundaries.");
    }

    private static void ValidatePlayer(int? player)
    {
        if (player is not null && player != 1 && player != 2) throw new Exception("Invalid player.");
    }

    public Game SetTile(int x, int y, int? player)
    {
        ValidateCoordinates(x, y);
        ValidatePlayer(player);

        Tiles = Tiles.Where(it => !(it.X == x && it.Y == y)).ToList();
        Tiles.Add(new Tile(x, y, player));

        Turn = 3 - Turn;
        CheckWinner();

        return this;
    }

    private void CheckWinner()
    {
        // TODO: Add the actual logics
        for (var i = 1; i <= 2; i++)
        {
            var tilesPlayer = Tiles.Where(it => it.Player == i).ToList();
            if (tilesPlayer.Count == 3) Winner = i;
        }
    }

    public record Tile(int X, int Y, int? Player = null);
}