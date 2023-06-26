import {
    TimeProps,
    CountdownCircleTimer,
    Props,
    MultipleColors,
    ColorHex,
} from "react-countdown-circle-timer";
import { QuestionPageState } from "../../types/QuestionPage";
import "../../styles/question/Timer.scss";
import { Points } from "src/types/Question";

const TIMER_DURATION = 60;
const SW = ["#e6e6e6", "#CB3966", "#e60017", "#4E192F", "#1F0815"];

interface TimerProps {
    pageState: QuestionPageState;
    timesUp: (chosenAnswer?: string) => void;
    disabled: boolean;
    variant: Points;
}

type VariantData = Partial<Props> &
    MultipleColors & {
        fontSize: number;
        maxFontSize: number;
    };

const getVariantData = (variant: Points): VariantData => {
    switch (variant) {
        case Points.One:
        case Points.Two:
        case Points.Three:
        case Points.Four:
            return {
                size: 150,
                colors: ["#d6b786", "#FFFFFF", "#3d3d3d"],
                fontSize: 2,
                maxFontSize: 4,
                trailColor: "#f2f2f2",
                colorsTime: [TIMER_DURATION, TIMER_DURATION / 2, 0],
                strokeWidth: 7,
            };
        case Points.Five:
            return {
                size: 200,
                colors: ["#b05d6c", "#CB3966", "#FF7583", "#4E192F", "#1F0815"],
                fontSize: 2,
                maxFontSize: 7,
                trailColor: "#2b2d33",
                colorsTime: [
                    TIMER_DURATION,
                    (TIMER_DURATION * 2) / 3,
                    (TIMER_DURATION * 1) / 2,
                    (TIMER_DURATION * 2) / 5,
                    0,
                ],
            };
    }
};

export function Timer({ pageState, timesUp, disabled, variant }: TimerProps) {
    const {
        size,
        colors,
        fontSize,
        maxFontSize,
        trailColor,
        colorsTime,
        strokeWidth,
    } = getVariantData(variant);
    const renderCountDownText = ({
        remainingTime,
        color,
        elapsedTime,
    }: TimeProps) => {
        const progress =
            (Math.ceil((elapsedTime / (remainingTime + elapsedTime)) * 10) *
                1) /
            10;
        return (
            <div
                className="time"
                style={{
                    color: color,
                    fontWeight: progress * 600 + 300,
                    fontSize: `${
                        fontSize + (maxFontSize - fontSize) * progress
                    }rem`,
                }}
            >
                {remainingTime}
            </div>
        );
    };

    const isPlaying = !disabled && pageState !== QuestionPageState.COMPLETED;

    return (
        <div className="clock">
            <CountdownCircleTimer
                isPlaying={isPlaying}
                trailColor={trailColor}
                strokeWidth={strokeWidth || 10}
                strokeLinecap="square"
                duration={TIMER_DURATION}
                size={size}
                colors={colors}
                // colors={["#50a696", "#4fb86b","#CB3966", "#520B19", "#F7B801", "#f44369", "#c5302e"]}
                colorsTime={colorsTime}
                onComplete={() => {
                    timesUp();
                    return { delay: 1 };
                }}
            >
                {renderCountDownText}
            </CountdownCircleTimer>
        </div>
    );
}
