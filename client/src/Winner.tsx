import Marker from "./Icons/Marker";
import React from "react";

interface Props {
    player: number;
}

const Winner = ({player}: Props) => {
    if (player === -1) return <div>💤 Draw</div>
    return <>🏆 Winner: <Marker player={player}/></>
}

export default Winner