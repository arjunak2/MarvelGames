import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tile from "./Tile";
import "../styles/GameBoard.scss";
import {
    Points,
    mapJsonToQuestion,
} from "../types/Question";
import { IGameBoard, Tileinfo } from "../types/GameBoard";
import { socket } from "../utils/WebSocket";
import { GBData } from "../data/GameBoard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "src/store";
import { questionPageActions } from "src/store/QuestionPageSlice";
import { Icons, Symbols } from "src/assets";
import { Powers } from "src/types/Powers";
import { Loader } from "./Loader";
import { Teams } from "src/types/Team";

function TableHeaderRow({ data }: { data: IGameBoard }) {
    const categories = Object.keys(data);
    const CategoryElements = categories.map((category) => (
        <Col key={category}>
            <h2>{category}</h2>
        </Col>
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
                isAnswered={tileInfo.isAnswered}
            />
        </Col>
    );
}

function PlayerCard() {
    const { player } = useSelector((state) => {
        let { currentPlayer } = state.page;
        let player = state.playerInfo.players[currentPlayer];
        return { player };
    });
    const ICON = Icons[player.icon];
    const POWERS = Object.entries(player.powerBank).map(([power, values]) => {
        const PowerIcon = Symbols[power as Powers];
        return (
            <div className="power">
                <PowerIcon width={50} height={50} className="icon" />
                <h3 className="count">{values.count}</h3>
            </div>
        );
    });
    return (
        <div className={`player-card  ${player.color}`}>
            <h1 className="player">{`${player.madeUpNames}`}</h1>
            <ICON className="player-icon" />
            <div className="power-bank">{POWERS}</div>
        </div>
    );
}

function ScoreCard() {
    const { teamData } = useSelector((state) => {
        return state.page;
    });
    return (
        <div className="score-card">
            <div className="team team-1">
                <h3 className="teamName">{Teams[0]}</h3>
                <h3 className="score">{`${teamData[Teams[0]].score}`}</h3>
            </div>
            <div className="team team-2">
                <h3 className="teamName">{Teams[1]}</h3>
                <h3 className="score">{`${teamData[Teams[1]].score}`}</h3>
            </div>
        </div>
    );
}
function InfoColumn() {
    return (
        <div className={`info-column`}>
            <PlayerCard />
            <ScoreCard />
        </div>
    );
}

export function GameBoard() {
    const [gBoard, setGBoard] = useState<IGameBoard>(GBData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentPlayer } = useSelector((state) => {
        return state.page;
    });
    const { isCurrentPlayerSelf, isGrandMaster } = useSelector((store) => {
        let isCurrentPlayerSelf =
            store.playerInfo.id == store.page.currentPlayer;
        let isGrandMaster = store.playerInfo.id == "master";
        return { isCurrentPlayerSelf, isGrandMaster };
    });
    useEffect(() => {
        socket.on("updateBoard", (gBoard) => {
            console.log("UPDATING BOARD");
            setGBoard(gBoard);
        });
        socket.on("transitionToQuestion", (question) => {
            console.log("Question selected!");
            dispatch(questionPageActions.setQuestion(question));
            const QUESTION = mapJsonToQuestion(question);
            navigate(`/question/${question.id}`, {
                state: { question: QUESTION },
            });
        });
        socket.emit("getGameBoard");
    }, []);
    if (currentPlayer == undefined || currentPlayer == "") return <Loader />;
    return (
        <div
            className={`grid-container ${
                !isCurrentPlayerSelf && !isGrandMaster && "page-disabled"
            }`}
        >
            <Container className="game-board">
                <TableHeaderRow data={gBoard} />
                <TableRow row={1} data={gBoard} />
                <TableRow row={2} data={gBoard} />
                <TableRow row={3} data={gBoard} />
                <TableRow row={4} data={gBoard} />
                <TableRow row={5} data={gBoard} />
            </Container>
            <InfoColumn />
        </div>
    );
}
