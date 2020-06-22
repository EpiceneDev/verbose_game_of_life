import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// import NewGame from "./new-game";
import Game from "./game";
// import Main from "./other-game";

ReactDOM.render(
  <React.StrictMode>
    <Game />
    {/* <Main /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
