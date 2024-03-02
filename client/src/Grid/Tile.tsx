import React from "react";
import {Props as RowProps} from "./Row";
import "./Tile.css";
import Marker from "../Icons/Marker";

type Props = RowProps & {
    x: number
}

const Tile = ({game, player, setTile, y, x}: Props) => {
    const currentTile = game.tiles.find(it => it.x === x && it.y === y)?.player;
    const onClick = () => {
        if (game.turn !== player || game.winner) return;
        if (!currentTile) {
            setTile(x, y, player);
        }
    }

    const classNames = ["tile", currentTile === player && "current"].filter(Boolean).join(' ')

    return <div
        className={classNames}
        onClick={onClick}>
        <Marker player={currentTile}/>
    </div>;
}

export default Tile