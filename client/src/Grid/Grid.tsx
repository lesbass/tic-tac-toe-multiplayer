import React from "react";
import {Game} from "../types";
import './Grid.css';
import Row from "./Row";

export interface Props {
    game: Game;
    player: number;
    setTile: (x: number, y: number, player: number) => void;
}

const Grid = (props: Props) => {
    return <div className="grid">
        {Array.from({length: 3}).map((_, y) => <Row key={`row${y}`} y={y} {...props}/>)}
    </div>
}

export default Grid