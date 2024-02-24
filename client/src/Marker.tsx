import Circle from "./Circle";
import Cross from "./Cross";

interface Props {
    player: number;
}

const Marker = ({player}: Props) => {
    if (player === 1) return <Cross/>
    return <Circle/>
}

export default Marker