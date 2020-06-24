import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 25;
const numCols = 25;

// const speedStart = 100;

const neighborLoc = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

// Helper functions
const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const Slider = (speed, onSpeedChange) => {
    const handleChange = (e) => onSpeedChange(e.target.value)
    return (
        <input 
            type="range"
            min="50"
            max="1500"
            step="50"
            value={speed}
            onChange={handleChange}
    )
}

function Game() {
  // The grid is the displayed/video buffer (running buffer)
  // First, create a grid and use it
  // as initial value for the grid state/video buffer
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  // Set flags for running
  const [isRunning, setIsRunning] = useState(false);

//   const [speed, setSpeed] = 

  // and a ref that persists without causing rerender.
  const runRef = useRef(isRunning);

  runRef.current = isRunning;

  // Rerender the the grid based on the runRef flag
  const runSimulation = useCallback(() => {
    if (!runRef.current) {
      return;
    }

    // ⬇️ Examples from immer on Github
    // produce(currentState, producer: (draftState) => void): nextState
    // const mapper = produce((draft, index) => {
    //     draft.index = index
    // })

    // produce is a currying technique
    // Currying takes multiple arity of function and
    //   calls again with less functions as a means of
    //   cellular autonama (CA)

    // setGrid will build the map
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            neighborLoc.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  const handleRun = () => {
    setRunning(!running);
    if (!running) {
      runRef.current = true;
      runSimulation();
    }
  };

  const handlePopulate = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }

    setGrid(rows);
  };

  const handleClear = () => {
    setGrid(generateEmptyGrid());
  };

  const speedChangeHandler = () => {

  }

  return (
    <div className="board">
      <button onClick={handleRun}>{isRunning ? start : stop}</button>
      <button onClick={handlePopulate}>Populate</button>
      <button onClick={handleClear}>Clear</button>
      <span>
        {"FASTER "}
        <slider speed={speed} onChange={speedChangeHandler} />
        {" SLOWER"}
      </span>
    </div>
  );
}

export default Game;
