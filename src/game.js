import React, { useState } from "react";
import { ButtonToolbar, MenuItem, DropdownButton } from "react-bootstrap";

import Cell from "./cell";
import Buttons from "./buttons";
import "./game.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

function Game() {
  let rows = HEIGHT / CELL_SIZE;
  let cols = WIDTH / CELL_SIZE;

  const [gameState, setGameState] = useState({
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

  // Calculate the position of the board element
  const getElementOffset = () => {
    const rect = board.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

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

  // console.log("CELLS: ", gameState.cells);

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
    setGameState({ cells: makeCells() });
  };
  console.log("Cells...", gameState.cells);
  return (
    <div
      className="gameboard"
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
      }}
      onClick={handleClick}
      ref={(xy) => (board.boardRef = xy)} // saves the reference to the cell
      cell_size={CELL_SIZE}
    >
      {gameState.cells.flatMap((cell) => (
        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
      ))}
    </div>
  );
}

export default Game;
