import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 25;
const numCols = 25;

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

// Helper function
const generateEmptyGrid = () => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
}

function Game() {
    // Put grid into state for access
    const [grid, setGrid] = useState({
        return generateEmptyGrid();
    });

    // Set flags for running and a ref that persists without causing rerender
    const [isRunning, setIsRunning] = useState(false)

    const runRef = useRef(isRunning);

    runRef.current = isRunning;

    const 

    setGrid(() => {
        returns produce(draft, (gridCopy) => {
            
        })
    })
}

export default Game