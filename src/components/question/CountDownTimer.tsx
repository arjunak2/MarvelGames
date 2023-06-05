import { TimeProps, CountdownCircleTimer } from "react-countdown-circle-timer";
import { QuestionPageState } from "../../types/QuestionPage";
import "../../styles/Timer.scss";


const TIMER_DURATION = 40;
const SW = ["#e6e6e6", "#CB3966", "#e60017", "#4E192F", "#1F0815"];

interface TimerProps {
    pageState: QuestionPageState;
    timesUp: (chosenAnswer?: string) => void;
    disabled: boolean
}

export function Timer({
    pageState,
    timesUp,
    disabled
}: TimerProps) {
    const renderCountDownText = ({
        remainingTime,
        color,
        elapsedTime,
    }: TimeProps) => {
        const progress = Math.ceil(elapsedTime / (remainingTime + elapsedTime)*10)*1/10;
        return (
            <div
                className="time"
                style={{
                    color: color,
                    fontWeight: progress * 600 + 300,
                    fontSize: `${progress * 5 + 2}rem`,
                }}
            >
                {remainingTime}
            </div>
        );
    };

    const isPlaying = !disabled && pageState !== QuestionPageState.COMPLETED
    
    return (
        <CountdownCircleTimer
            isPlaying={isPlaying}
            trailColor={"#2b2d33"}
            strokeWidth={10}
            strokeLinecap="square"
            duration={TIMER_DURATION}
            size={200}
            colors={["#b05d6c", "#CB3966", "#FF7583", "#4E192F", "#1F0815"]}
            // colors={["#50a696", "#4fb86b","#CB3966", "#520B19", "#F7B801", "#f44369", "#c5302e"]}
            colorsTime={[
                TIMER_DURATION,
                (TIMER_DURATION * 2) / 3,
                (TIMER_DURATION * 1) / 2,
                (TIMER_DURATION * 2) / 5,
                0,
            ]}
            onComplete={() => {
                timesUp();
                return { delay: 1 };
            }}
        >
            {renderCountDownText}
        </CountdownCircleTimer>
    );
}
