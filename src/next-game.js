import React from "react";

// TODO Put in Less
const rows = 50;
const cols = 50;

// TODO may try Math.floor(Math.random()*4)
const newBoardStatus = (cellStatus = Math.random() < 0.3) => {
  const grid = [];

  for (let r = 0; r < rows; r++) {
    // At each row, construct and array of cells(columns)
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = cellStatus();
    }
  }
  return grid;
};
