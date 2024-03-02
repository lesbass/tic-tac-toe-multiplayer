public class Game
{
    public Game()
    {
        Reset();
    }

    public List<Tile> Tiles { get; set; } = [];
    public int? Winner { get; set; }
    public int Turn { get; set; } = 1;

    public void Reset()
    {
        Tiles = [];
        for (var y = 0; y < 3; y++)
        for (var x = 0; x < 3; x++)
            Tiles.Add(new Tile(x, y));
        Winner = null;
        Turn = 1;
    }

    private static void ValidateCoordinates(int x, int y)
    {
        if (x < 0 || x > 2 || y < 0 || y > 2) throw new Exception("Coordinates outside boundaries.");
    }

    private static void ValidatePlayer(int? player)
    {
        if (player is not null && player != 1 && player != 2) throw new Exception("Invalid player.");
    }

    public void SetTile(int x, int y, int? player)
    {
        ValidateCoordinates(x, y);
        ValidatePlayer(player);

        Tiles = Tiles.Where(it => !(it.X == x && it.Y == y)).ToList();
        Tiles.Add(new Tile(x, y, player));

        Turn = 3 - Turn;
        CheckWinner();
    }

    private void CheckWinner()
    {
        Winner = GetWinner(Tiles);
    }

    private static int? GetWinner(IReadOnlyCollection<Tile> tiles)
    {
        for (var i = 1; i <= 2; i++)
        {
            var tilesPlayer = tiles.Where(it => it.Player == i).ToList();

            var wonByRow = tilesPlayer.GroupBy(it => it.Y).Any(it => it.Count() == 3);
            var wonByColumn = tilesPlayer.GroupBy(it => it.X).Any(it => it.Count() == 3);
            var wonByDiagonal1 = tilesPlayer.Count(it => it.X == it.Y) == 3;
            var wonByDiagonal2 = tilesPlayer.Count(it => it.X == 2 - it.Y) == 3;

            if (wonByColumn || wonByRow || wonByDiagonal1 || wonByDiagonal2) return i;
        }

        if (tiles.All(it => it.Player is not null)) return -1;

        return null;
    }

    public record Tile(int X, int Y, int? Player = null);
}