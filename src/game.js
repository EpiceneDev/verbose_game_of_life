import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 50;
const numCols = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function Game() {
    const [grid, setGrid] = useState({
        return GenerateEmptyGrid();
    });

    // Set flags for running and a ref that persists without causing rerender
    const [isRunning, setIsRunning] = useState(false)

    const runRef = useRef(isRunning);

    runRef.current = isRunning


}

export default Game