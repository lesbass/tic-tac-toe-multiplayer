import React from "react";
import Marker from "./Icons/Marker";

interface Props {
    player: number;
    setPlayer: (player: number) => void;
}

const PlayerSelection = ({player, setPlayer}: Props) => {
    return <>
        <div>Choose player:</div>
        <div style={{display: "inline-block"}}>
            <div style={{display: "flex"}}>
                <Button buttonPlayer={1} player={player} setPlayer={setPlayer}/>
                <Button buttonPlayer={2} player={player} setPlayer={setPlayer}/>
            </div>
        </div>
        <hr/>
    </>
}


type ButtonProps = Props & { buttonPlayer: number };

const Button = ({player, setPlayer, buttonPlayer}: ButtonProps) => {
    const buttonStyle = {
        width: 50,
        height: 50,
        border: "1px solid black",
        background: player === buttonPlayer ? "lightyellow" : "",
        display: "flex"
    };

    return <button style={buttonStyle} onClick={() => setPlayer(buttonPlayer)}>
        <Marker player={buttonPlayer}/>
    </button>
}

export default PlayerSelection