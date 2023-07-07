import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tile from "./Tile";
import { Points, QuestionCategory, mapJsonToQuestion } from "../types/Question";
import { CategoryTiles, IGameBoard, Tileinfo } from "../types/GameBoard";
import { socket } from "../utils/WebSocket";
import { GBData } from "../data/GameBoard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "src/store";
import { questionPageActions } from "src/store/QuestionPageSlice";
import { Icons, Symbols } from "src/assets";
import { Powers } from "src/types/Powers";
import { Loader } from "./Loader";
import { Teams } from "src/types/Team";
import "../styles/gameboard/GameBoard.scss";
import "../styles/gameboard/InfoColumn.scss";
import "../styles/gameboard/ScoreCard.scss";

function Category({
    category,
    categoryTiles,
}: {
    category: QuestionCategory;
    categoryTiles: CategoryTiles;
}) {
    const Header = () => <h2 className="category-header">{category}</h2>;

    let isHovered = false;
    const TILES = Object.values(categoryTiles).map((tileInfo) => {
        if (tileInfo.isHovered && !tileInfo.isAnswered) isHovered = true;
        return (
            <TileCell
                key={tileInfo.id}
                category={category}
                tileInfo={tileInfo}
            />
        );
    });

    return (
        <div className={`category ${isHovered ? "selected" : ""}`}>
            <Header />
            <div className="tile-container">{TILES}</div>
        </div>
    );
}

function TileCell({
    tileInfo,
    category,
}: {
    tileInfo: Tileinfo;
    category: string;
}) {
    return (
        <Tile
            tileInfo={tileInfo}
            category={category}
            text={tileInfo.points}
            isHovered={tileInfo.isHovered}
            isAnswered={tileInfo.isAnswered}
        />
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
    const CATEGORIES = Object.values(QuestionCategory).map((category) => {
        return (
            <Category
                category={category as QuestionCategory}
                categoryTiles={gBoard[category]}
            />
        );
    });
    return (
        <div
            className={`page-container ${
                !isCurrentPlayerSelf && !isGrandMaster && "page-disabled"
            }`}
        >
            <div className="game-board">
                <Category
                    category={QuestionCategory.CATEGORY_1}
                    categoryTiles={gBoard[QuestionCategory.CATEGORY_1]}
                />
                <Category
                    category={QuestionCategory.CATEGORY_2}
                    categoryTiles={gBoard[QuestionCategory.CATEGORY_2]}
                />
                <Category
                    category={QuestionCategory.CATEGORY_3}
                    categoryTiles={gBoard[QuestionCategory.CATEGORY_3]}
                />
                <Category
                    category={QuestionCategory.CATEGORY_4}
                    categoryTiles={gBoard[QuestionCategory.CATEGORY_4]}
                />
                <Category
                    category={QuestionCategory.CATEGORY_5}
                    categoryTiles={gBoard[QuestionCategory.CATEGORY_5]}
                />
            </div>
            <InfoColumn />
        </div>
    );
}
