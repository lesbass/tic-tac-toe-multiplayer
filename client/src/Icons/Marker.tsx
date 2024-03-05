import Circle from "./Circle";
import Cross from "./Cross";

interface Props {
  player?: number;
}

const Marker = ({ player }: Props) => {
  if (player === 1) return <Cross />;
  if (player === 2) return <Circle />;
  return <></>;
};

export default Marker;
