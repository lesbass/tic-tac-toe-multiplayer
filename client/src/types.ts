export interface Game {
  winner?: number;
  tiles: {
    x: number;
    y: number;
    player?: number;
  }[];
  turn: number;
}
