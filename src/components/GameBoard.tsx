import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Logo from "../public/assets/logo.svg";
import Row from "react-bootstrap/Row";
import Tile from "./Tile";
import "../styles/GameBoard.scss";
import {
    Points,
    QuestionType,
    Question_MC,
    Question_Text,
    defaultMCQuestion,
    defaultTextQuestion,
    mapJsonToQuestion,
} from "../types/Question";
import { IGameBoard, Tileinfo } from "../types/GameBoard";
import { socket } from "../utils/WebSocket";
import { GBData } from "../data/GameBoard";
import { QUESTIONS_DB } from "../data/QuestionRepository";
import { redirect, useNavigate } from "react-router-dom";
import { plainToClass } from "class-transformer";
// const  = require("../types/Question");
// console.log(JSON.stringify(QUESTIONS_DB));
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
            <TileCell
                key={`${category}_${row * 100}`}
                category={category}
                tileInfo={data[category][(row * 100) as Points]}
            />
        );
    }

    return <Row className="g-5">{RowElements}</Row>;
}

function TileCell({
    tileInfo,
    category,
}: {
    tileInfo: Tileinfo;
    category: string;
}) {
    return (
        <Col>
            <Tile
                tileInfo={tileInfo}
                category={category}
                text={tileInfo.points}
                isHovered={tileInfo.isHovered}
            />
        </Col>
    );
}

export function GameBoard() {
    const [gBoard, setGBoard] = useState<IGameBoard>(GBData);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("updateBoard", (gBoard) => {
            console.log("UPDATING BOARD");
            setGBoard(gBoard);
        });
        socket.on("sendQuestion", (question) => {
            console.log("Question selected!");
            const QUESTION = mapJsonToQuestion(question);
            navigate(`/question/${question.id}`, { state: { question: QUESTION } });
        });
    }, []);
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
