import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QuestionPage } from "./components/question/Question";
import store from "./store";
import { GameBoard } from "./components/GameBoard";
import LoginPage from "./components/login/LoginPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                // path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/GameBoard",
                element: <GameBoard />,
            },
            {
                path: "/question/:questionId",
                element: <QuestionPage />,
            },
        ],
    },
]);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
