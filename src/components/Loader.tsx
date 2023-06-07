import { Spinner } from "react-bootstrap";

export function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
            <Spinner
                animation="border"
                role="status"
                variant="primary"
                style={{ height: "30vh", width: "30vh" }}
            />
        </div>
    );
}
