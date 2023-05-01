import React from "react";
import "../styles/Tile.scss";
import { Points } from "../types/Question";

interface TileProps {
    text: Points;
    onMouveOver?: () => void;
    onMouveLeave?: () => void;
    isHovered?: boolean;
}

function Tile({ text, onMouveOver, onMouveLeave, isHovered }: TileProps) {
    return (
        <div
            className={`tile-body rounded shadow-sm --bs-success-text
            ${
                isHovered ? "selected" : false
            }`}
            onMouseOver={onMouveOver}
            onMouseLeave={onMouveLeave}
        >
            {text}
        </div>
    );
}

export default Tile;
