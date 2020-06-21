import React, { useState } from "react";
import Grid from "./grid";
import "./game.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const Game = () => {
  let rows = HEIGHT / CELL_SIZE;
  let cols = WIDTH / CELL_SIZE;

  const [state, setState] = useState({
    cells: [],
  });

  const makeEmptyBoard = () => {
    let board = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  };

  let board = makeEmptyBoard();

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
