import React from "react";
import Grid from "./grid";
import "./game.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const Game = () => {
  return (
    <div>
      <div
        className="board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      ></div>
    </div>
  );
};
export default Game;
