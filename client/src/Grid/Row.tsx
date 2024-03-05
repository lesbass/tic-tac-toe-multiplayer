import Tile from "./Tile";
import { Props as GridProps } from "./Grid";
import "./Row.css";

export type Props = GridProps & {
  y: number;
};

const Row = ({ y, ...props }: Props) => {
  return (
    <div className="row">
      {Array.from({ length: 3 }).map((_, x) => (
        <Tile key={`tile${x}${y}`} y={y} x={x} {...props} />
      ))}
    </div>
  );
};

export default Row;
