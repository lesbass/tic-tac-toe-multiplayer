import { useEffect, useState } from "react";
import "./App.css";
import Connector from "./signalr-connection";
import { Game } from "./types";
import PlayerSelection from "./PlayerSelection";
import Winner from "./Winner";
import Grid from "./Grid";

const App = () => {
  const { setTile, reset, events } = Connector();
  const [game, setGame] = useState<Game>();
  const [player, setPlayer] = useState(1);

  useEffect(() => {
    events(setGame);
  }, [setGame, events]);

  if (!game) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="App">
      <PlayerSelection player={player} setPlayer={setPlayer} />
      {game.winner ? (
        <Winner player={game.winner} />
      ) : (
        <div>
          {game.turn === player ? "🎲 Your turn" : "⏱️ Opponent's turn"}
        </div>
      )}
      <hr />
      <Grid player={player} game={game} setTile={setTile} />
      <hr />
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
