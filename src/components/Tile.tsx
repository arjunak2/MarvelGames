import React from "react";
import "../styles/gameboard/Tile.scss";
import { Points } from "../types/Question";
import { socket } from "src/utils/WebSocket";
import { Tileinfo } from "src/types/GameBoard";
import { ScreenNames } from "src/types/Screens";

interface TileProps {
    text: Points;
    tileInfo: Tileinfo;
    category: string;
    isHovered?: boolean;
    isAnswered?: boolean;
}

function Tile({ text, tileInfo, category, isHovered, isAnswered }: TileProps) {
    const onHoverTile = () => {
        if (isAnswered) return;
        console.log("SELECTED");
        socket.emit("select", tileInfo, category);
    };
    const onLeaveTile = () => {
        if (isAnswered) return;
        socket.emit("deselect", tileInfo, category);
    };
    const onClickTile = () => {
        if (isAnswered) return;
        console.log("Tile Pressed", tileInfo);
        socket.emit("deselect", tileInfo, category);
        socket.emit("navigate", {
            name: "QUESTION",
            data: { questionId: tileInfo.id },
        });
    };
    return (
        <div
            className={`tile ${Points[text]} ${
                isHovered ? "selected" : false
            } ${isAnswered ? "answered" : false}
            `}
            onMouseOver={onHoverTile}
            onMouseLeave={onLeaveTile}
            onClick={onClickTile}
        >
            {text}
        </div>
    );
}

export default Tile;
