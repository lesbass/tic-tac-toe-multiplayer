import React, {useEffect, useState} from 'react';
import './App.css';
import Connector from './signalr-connection';
import {Game} from "./types";

const App = () => {
    const {setTile, getGame, reset, events} = Connector();
    const [game, setGame] = useState<Game>();
    const [player, setPlayer] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            events(setGame);
            getGame();
        }, 200);
    }, [])

    if (!game) return (<div>Loading...</div>);

    return (
        <div className="App">
            <div>
                <button style={{background: player === 1 ? "red" : "green"}} onClick={() => setPlayer(1)}>Player 1
                </button>
                <button style={{background: player === 2 ? "red" : "green"}} onClick={() => setPlayer(2)}>Player 2
                </button>
            </div>
            <hr/>
            {game.winner ? <div>
                Winner: Player {game.winner}
            </div> : <div>
                Turn: Player {game.turn}
            </div>}
            <hr/>
            <div>
                {Array.from({length: 3}).map((_, y) => <div>
                    {Array.from({length: 3}).map((_, x) => {
                        const currentTile = game.tiles.find(it => it.x === x && it.y === y)?.player;
                        const tileColor = currentTile === 1 ? "red" : currentTile === 2 ? "blue" : "white";
                        const onClick = () => {
                            if (game.turn !== player || game.winner) return;
                            if (!currentTile) {
                                console.log("SetGame", x, y, player)
                                setTile(x, y, player);
                            }
                        }
                        return <div
                            style={{
                                width: 50,
                                height: 50,
                                display: "inline-block",
                                border: "1px solid black",
                                background: tileColor
                            }}
                            onClick={onClick}></div>;
                    })}
                </div>)}
            </div>
            <div>
                <button onClick={() => reset()}>Reset
                </button>
            </div>
        </div>
    );
};

export default App;
