import React from "react";
import { Button } from "react-bootstrap";

export function HomeButton({
    visible,
    onClick,
}: {
    visible: boolean;
    onClick: () => void;
}) {
    return (
        <>
            {visible && (
                <Button className="home" variant="secondary" onClick={onClick}>
                    <img
                        src={
                            "https://www.svgrepo.com/show/22031/home-icon-silhouette.svg"
                        }
                        width="30"
                        height="30"
                    />
                </Button>
            )}
        </>
    );
}
