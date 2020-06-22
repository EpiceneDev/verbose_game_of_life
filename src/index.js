import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import NewGame from "./new-game";
// import Game from "./game";

ReactDOM.render(
  <React.StrictMode>
    <NewGame />
    {/* <Game /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
