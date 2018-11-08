import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./components/Game";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Major from "./components/MajorSystemInput";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
