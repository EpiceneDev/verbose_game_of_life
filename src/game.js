import React from "react";
import Grid from "./grid";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const Game = () => {
  return (
    <div>
      <div className="board" style={{ width: WIDTH, height: HEIGHT }}></div>
    </div>
  );
};
export default Game;
