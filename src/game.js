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

//   const handleChange = (e) => handleSpeedChange(e.target.interval);
//   return (
//     <input
//       type="range"
//       min="50"
//       max="1500"
//       step="50"
//       value={interval}
//       onChange={handleSpeedChange}
//     />
//   );
// };

function Game() {
  // The grid is the displayed/video buffer (running buffer)
  // First, create a grid and use it
  // as initial value for the grid state/video buffer
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  // Set flags for running
  const [isRunning, setIsRunning] = useState(false);

  const [interval, setInterval] = useState("1000");

  // Counts double-buffer exchanges
  const [generation, setGeneration] = useState(0);

  // and a ref that persists without causing rerender.
  const runRef = useRef(isRunning);

  runRef.current = isRunning;

  // Rerender the the grid based on the runRef flag
  const runSimulation = useCallback(() => {
    if (!runRef.current) {
      return;
    }
    // setGeneration(generation++);
    // console.log("GEN", generation);

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

    setTimeout((runSimulation, interval));
  }, []);

  setTimeout(runSimulation, interval);

  const handleRun = () => {
    let newGen = generation + 1;
    setIsRunning(!isRunning);
    if (!isRunning) {
      runRef.current = true;
      setGeneration(newGen);
      runSimulation();
    }
  };

  const handlePopulate = () => {
    if (isRunning) {
      return;
    }
    setGeneration(0);
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }

    setGrid(rows);
  };

  const handleClear = () => {
    setGeneration(0);
    setGrid(generateEmptyGrid());
  };

  // const Slider = (interval, handleSpeedChange) => {
  //   const handleChange = (e) => handleSpeedChange(e.target.interval);
  //   return (
  //     <input
  //       type="range"
  //       min="50"
  //       max="1500"
  //       step="50"
  //       value={interval}
  //       onChange={handleSpeedChange()}
  //     />
  //   );
  // };

  const handleSpeedChange = (newSpeed) => {
    setInterval(newSpeed);
    console.log(interval);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
        className="table"
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "white" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <div className="buttons">
        <button onClick={handleRun}>{isRunning ? "stop" : "start"}</button>
        <button onClick={handlePopulate}>Populate</button>
        <button onClick={handleClear}>Clear</button>
        <div className="slider">
          {
            "Enter an interval (between 50 and 2000 ms) and press return. Then run the game!"
          }
          <span>
            {"Buffer Loading interval: "}
            <input
              value={interval}
              type="number"
              min="50"
              max="1000"
              onChange={(e) => {
                setInterval(e.target.value);
                console.log(interval);
              }}
            />
            {" ms between grid change"}
          </span>
        </div>
        <div>{`Generation: ${generation}`}</div>
        {/* <button className="glider-gun" onChange={makeGliderGun}>
          Add a Glider
        </button> */}
      </div>
    </>
  );
}

export default Game;
