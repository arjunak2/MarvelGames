import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import Col from "react-bootstrap/Col";
import Logo from "../public/assets/logo.svg";
import Row from "react-bootstrap/Row";
import Tile from "./Tile";
import "../styles/GameBoard.scss";
import { Question } from "../types/Question";
import { IGameBoard } from "../types/GameBoard";
import { socket } from "../utils/WebSocket";
let GB: IGameBoard = require("../data/GameBoard.json");

function TableHeaderRow({ data }: { data: IGameBoard }) {
    const categories = Object.keys(data);
    const CategoryElements = categories.map((category) => (
        <Col key={category}>{category}</Col>
    ));
    return <Row className="g-2">{CategoryElements}</Row>;
}

function TableRow({ data, row }: { data: IGameBoard; row: number }) {
    const RowElements = [];
    for (let category in data) {
        RowElements.push(
            <TableCell
                key={`${category}_${row * 100}`}
                category={category}
                question={data[category][row * 100]}
            />
        );
    }

    return <Row className="g-5">{RowElements}</Row>;
}

function TableCell({
    question,
    category,
}: {
    question: Question;
    category: string;
}) {
    const onHoverTile = () => {
        socket.emit("select", question, category);
    };
    const onLeaveTile = () => {
        socket.emit("deselect", question, category);
    };
    return (
        <Col>
            <Tile
                text={question.points}
                onMouveOver={onHoverTile}
                onMouveLeave={onLeaveTile}
                isSelected={question.isHovered}
            />
        </Col>
    );
}

export function GameBoard() {
    const [gBoard, setGBoard] = useState<IGameBoard>(GB);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`WebSocket connection established! Id:${socket.id}`);
        });
        socket.on("updateBoard", (gBoard) => {
            setGBoard(gBoard);
        });
    });
    return (
        <>
            <div>
                <img src={Logo} height={50}></img>
                <div>Player 1</div>
            </div>
            <Container>
                <TableHeaderRow data={gBoard} />
                <TableRow row={1} data={gBoard} />
                <TableRow row={2} data={gBoard} />
                <TableRow row={3} data={gBoard} />
                <TableRow row={4} data={gBoard} />
                <TableRow row={5} data={gBoard} />
            </Container>
        </>
    );
}
