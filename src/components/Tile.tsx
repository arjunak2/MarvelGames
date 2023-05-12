import React from "react";
import "../styles/Tile.scss";
import { Points } from "../types/Question";
import { socket } from "src/utils/WebSocket";
import { Tileinfo } from "src/types/GameBoard";
import { ScreenNames } from "src/types/Screens";

interface TileProps {
    text: Points;
    tileInfo: Tileinfo;
    category: string;
    isHovered?: boolean;
}

function Tile({ text, tileInfo, category, isHovered }: TileProps) {
    const onHoverTile = () => {
        console.log("SELECTED");
        socket.emit("select", tileInfo, category);
    };
    const onLeaveTile = () => {
        socket.emit("deselect", tileInfo, category);
    };
    const onClickTile = () => {
        console.log("Tile Pressed", tileInfo);
        socket.emit("deselect", tileInfo, category);
        socket.emit("navigate", {
            name: "QUESTION",
            data: { questionId: tileInfo.id },
        });
    };
    return (
        <div
            className={`tile-body rounded shadow-sm --bs-success-text
            ${isHovered ? "selected" : false}`}
            onMouseOver={onHoverTile}
            onMouseLeave={onLeaveTile}
            onClick={onClickTile}
        >
            {text}
        </div>
    );
}

export default Tile;
