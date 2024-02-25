import * as signalR from "@microsoft/signalr";
import {Game} from "./types";

const URL = process.env.REACT_APP_HUB_ADDRESS ?? "https://localhost:5001/hub"; //or whatever your backend port is
class Connector {
    public connection: signalR.HubConnection;
    public events: (onSetGame: (game: Game) => void) => void;
    static instance: Connector;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start()
            .then(_ => this.getGame())
            .catch(err => console.error(err));

        this.events = (onSetGame) => {
            this.connection.on("setGame", (game: Game) => {
                onSetGame(game);
            });
        };
    }

    public getGame = () => {
        this.connection.send("getGame").then(x => console.log("sent"))
    }

    public setTile = (x: number, y: number, player: number) => {
        this.connection.send("setTile", x, y, player).then(x => console.log("sent"))
    }

    public reset = () => {
        this.connection.send("reset").then(x => console.log("sent"))
    }

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

export default Connector.getInstance;