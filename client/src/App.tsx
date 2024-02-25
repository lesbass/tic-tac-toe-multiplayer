import React, {useEffect, useState} from 'react';
import './App.css';
import Connector from './signalr-connection';
import {Game} from "./types";
import Cross from "./Cross";
import Circle from "./Circle";
import PlayerSelection from "./PlayerSelection";
import Winner from "./Winner";

const App = () => {
    const {setTile, getGame, reset, events} = Connector();
    const [game, setGame] = useState<Game>();
    const [player, setPlayer] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            events(setGame);
            getGame();
        }, 200);
    }, [setGame, getGame])

    if (!game) return (<div>Loading...</div>);

    return (
        <div className="App">
            <PlayerSelection player={player} setPlayer={setPlayer}/>
            {game.winner ? <Winner player={game.winner}/> : <div>
                {game.turn === player ? "🎲 Your turn" : "⏱️ Opponent's turn"}
            </div>}
            <hr/>
            <div style={{display: "inline-block"}}>
                {Array.from({length: 3}).map((_, y) => <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {Array.from({length: 3}).map((_, x) => {
                        const currentTile = game.tiles.find(it => it.x === x && it.y === y)?.player;
                        const tileColor = currentTile === player ? "lightyellow" : '';
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
                                border: "1px solid black",
                                display: "flex",
                                backgroundColor: tileColor,
                            }}
                            onClick={onClick}>
                            {currentTile === 1 && <Cross/>}
                            {currentTile === 2 && <Circle/>}
                        </div>;
                    })}
                </div>)}
            </div>
            <hr/>
            <div>
                <button onClick={() => reset()}>Reset</button>
            </div>
        </div>
    );
};

export default App;
