import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import GenerateEmptyGrid from "./generateEmptyGrid";
import { ButtonToolbar, MenuItem, DropdownButton } from "react-bootstrap";
import "./game.css";

const rowsSize = 50;
const colsSize = 50;

const neighborLocations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function NewGame() {
  const [grid, setGrid] = useState(() => {
    return GenerateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  // useCallback returns a memoized callback
  // that only changes if a dependency does...
  // "useRef returns a mutable ref object whose .current property
  // is initialized to the passed argument (initialValue).
  // The returned object will persist for the full lifetime of the component." -reactjs.org
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // produce(currentState, producer: (draftState) => void): nextState
    setGrid((draft) => {
      return produce(draft, (gridCopy) => {
        for (let i = 0; i < rowsSize; i++) {
          for (let j = 0; j < colsSize; j++) {
            let neighbors = 0;
            neighborLocations.forEach(([x, y]) => {
              const x1 = i + x;
              const y1 = j + y;
              if (
                x1 >= 0 &&
                x1 < colsSize &&
                y1 >= 0 &&
                y1 < rowsSize &&
                draft[x1][y1]
              ) {
                neighbors += 1;
              }

              return neighbors;
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (draft[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < rowsSize; i++) {
            rows.push(
              Array.from(Array(colsSize), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        random
      </button>
      <button
        onClick={() => {
          setGrid(GenerateEmptyGrid());
        }}
      >
        clear
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colsSize}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              className="gameboard"
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
                backgroundColor: grid[i][j] ? "green" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default NewGame;
