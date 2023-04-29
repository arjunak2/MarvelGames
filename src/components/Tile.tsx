import React from "react";
import "../styles/Tile.scss";
import { Points } from "../types/Question";

interface TileProps {
    text: Points;
    onMouveOver?: () => void;
    onMouveLeave?: () => void;
    isSelected?: boolean;
}

function Tile({ text, onMouveOver, onMouveLeave, isSelected }: TileProps) {
    return (
        <div
            className={`tile-body rounded shadow-sm --bs-success-text
            ${
                isSelected ? "selected" : false
            }`}
            onMouseOver={onMouveOver}
            onMouseLeave={onMouveLeave}
        >
            {text}
        </div>
    );
}

export default Tile;
