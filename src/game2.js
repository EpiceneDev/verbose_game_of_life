import React, { useState, useEffect } from 'react'
import produce from 'immer''

import GenerateEmptyGrid from './generateEmptyGrid'

const rowNum = 25
const colNum = 25

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];

function Game() {
    const [grid, setGrid] = useState(() => {
        return GenerateEmptyGrid();
      });

    const [running, setRunning] = useState(false)

    const runningRef = useRef(running)
    runningRef.current = running;
}


export default Game