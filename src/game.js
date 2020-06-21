import React, { useState } from "react";
import Cell from "./cell";
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

  // Make cell identities in board
  const makeCells = () => {
    let cells = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  };

  // Calculate the position of the board element
  const getElementOffset = () => {
    const rect = board.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

  const handleClick = (e) => {
    const elemOffset = getElementOffset();
    const offsetX = e.clientX - elemOffset.x;
    const offsetY = e.clientY - elemOffset.y;

    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    // If the space on the grid is clicked...
    if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
      board[y][x] = !board[y][x]; //toggles dead/alive
    }
    setState({ cells: makeCells() });
  };
  console.log(state);
  return (
    <div>
      <div
        className="board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
        onClick={handleClick}
        ref={(xy) => (board.boardRef = xy)} // saves the reference to the cell
        cell_size={CELL_SIZE}
      >
        {state.cells.map((cell) => (
          <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
        ))}
      </div>
    </div>
  );
};

export default Game;
