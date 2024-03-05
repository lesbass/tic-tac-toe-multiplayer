import * as signalR from "@microsoft/signalr";
import { Game } from "./types";

const URL = import.meta.env.VITE_HUB_ADDRESS;

class Connector {
  private connection: signalR.HubConnection;
  public events: (onSetGame: (game: Game) => void) => void;
  static instance: Connector;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection
      .start()
      .then((_) => this.getGame())
      .catch((err) => console.error(err));

    this.events = (onSetGame) => {
      this.connection.on("setGame", (game: Game) => {
        onSetGame(game);
      });
    };
  }

  private getGame = () => {
    this.connection.send("getGame").catch((err) => console.error(err));
  };

  public setTile = (x: number, y: number, player: number) => {
    this.connection
      .send("setTile", x, y, player)
      .catch((err: unknown) => console.error(err));
  };

  public reset = () => {
    this.connection.send("reset").catch((err: unknown) => console.error(err));
  };

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}

export default Connector.getInstance;
