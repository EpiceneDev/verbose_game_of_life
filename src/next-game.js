// import React, { useState, useEffect, useRef } from "react";
// // import UseInterval from "./util/useInterval";
// import "./next-game.scss";
// import useInterval from "./util/useInterval";

// // TODO Put in Less
// const rows = 50;
// const cols = 50;

// //////Helper Functions
// // TODO may try Math.floor(Math.random()*4)
// // 0.3 gives a 30% chance of being alive
// const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
//   const grid = [];

//   //   Array(rows).fill().map(() => new Array(cols).fill().map(() => Math.floor(Math.random() * 2)))

//   for (let r = 0; r < rows; r++) {
//     // At each row, construct and array of cells(columns)
//     grid[r] = [];
//     for (let c = 0; c < cols; c++) {
//       grid[r][c] = cellStatus();
//     }
//   }
//   return grid;
// };

// // TODO: let grid = Array(this.rows)
// //       .fill()
// //       .map(() => Array(this.cols).fill(false));

// // function buildGrid() {
// //     return new Array(COLS).fill(null)
// //       .map(() => new Array(ROWS).fill(null)
// //         .map(() => Math.floor(Math.random() * 2)));
// //   }

// // Creates the board grid and a method
// // allowing users to toggle the status of individual cells as props.
// // This method is defined on the main component where all the state of the application is held.
// const BoardGrid = ({ boardStatus, toggleCellStatus }) => {
//   const handleClick = (r, c) => toggleCellStatus(r, c);
//   const tr = [];

//   for (let r = 0; r < rows; r++) {
//     const td = [];
//     for (let c = 0; c < cols; c++) {
//       td.push(
//         <td
//           key={`${r},${c}`}
//           className={boardStatus[r][c] ? "alive" : "dead"}
//           onClick={() => handleClick(r, c)}
//         />
//       );
//     }
//     tr.push(<tr key={r}>{td}</tr>);
//   }
//   return (
//     <table>
//       <tbody>{tr}</tbody>
//     </table>
//   );
// };

// const Slider = () => {};

// function Game() {
//   const boardRef = useRef(null);
//   const { current } = boardRef;
//   const prevState = current;

//   const [gameState, setGameState] = useState({
//     boardStatus: newBoardStatus(),
//     generation: 0,
//     isRunning: false,
//     speed: 500,
//   });

//   const startStopButton = () => {
//     return gameState.isRunning ? (
//       <button type="button" onClick={handleStop}>
//         Stop
//       </button>
//     ) : (
//       <button type="button" onClick={handleStart}>
//         Start
//       </button>
//     );
//   };

//   const clearBoard = () => {
//     setGameState({
//       boardStatus: newBoardStatus(() => false),
//       generation: 0,
//     });
//   };

//   const makeNewBoard = () => {
//     setGameState({
//       boardStatus: newBoardStatus(),
//       generation: 0,
//     });
//   };

//   const handleToggleCellStatus = (r, c) => {
//     const toggleBoardStatus = (prevState) => {
//       const clonedBoardStatus = JSON.parse(
//         JSON.stringify(prevState.boardStatus)
//       );
//       clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
//       return clonedBoardStatus;
//     };

//     setGameState((prevState) => ({
//       boardStatus: toggleBoardStatus(prevState),
//     }));
//   };

//   const handleNextStep = () => {
//     const nextStep = (prevState) => {
//       // current board state is boardStatus buffer
//       const boardStatus = prevState.boardStatus;
//       // cloned state is next buffer
//       const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));

//       const amountAliveNeighbors = (r, c) => {
//         const neighbors = [
//           [-1, -1],
//           [-1, 0],
//           [-1, 1],
//           [0, 1],
//           [1, 1],
//           [1, 0],
//           [1, -1],
//           [0, -1],
//         ];

//         // Put alive neighbors into the new array
//         return neighbors.reduce((aliveNeighbors, neighbor) => {
//           const x = r + neighbor[0];
//           const y = c + neighbor[1];
//           const isNeighborOnBoard = x >= 0 && x < rows && y >= 0 && y < cols;
//           /* No need to count more than 4 alive neighbors */
//           if (aliveNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
//             return aliveNeighbors + 1;
//           } else {
//             return aliveNeighbors;
//           }
//         }, 0);
//       };

//       // TODO: forEach / map
//       //   ? Place terinary in ifelseif?
//       for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//           const totalAliveNeighbors = amountAliveNeighbors(r, c);

//           if (!boardStatus[r][c]) {
//             if (totalAliveNeighbors === 3) clonedBoardStatus[r][c] = true;
//           } else {
//             if (totalAliveNeighbors < 2 || totalAliveNeighbors > 3)
//               clonedBoardStatus[r][c] = false;
//           }

//           //   if (conditionA) {
//           //     if (conditionB) {
//           //       return valueA;
//           //     }
//           //     return valueB;
//           //   }
//           //   return valueC;

//           // (!conditionA)
//           //  ? valueC
//           //  : (conditionB)
//           //  ? valueA
//           //  : valueB

//           //   !boardStatus[r][c]
//           //     ? null
//           //     : totalAliveNeighbors === 3
//           //     ? (clonedBoardStatus[r][c] = true)
//           //     : totalAliveNeighbors < 2 || totalAliveNeighbors > 3
//           //     ? (clonedBoardStatus = false)
//           //     : null;
//         }
//       }

//       return clonedBoardStatus;
//     };

//     setGameState((prevState) => ({
//       boardStatus: nextStep(prevState),
//       generation: prevState.generation + 1,
//     }));
//   };

//   const handleStart = () => {
//     setGameState({ isRunning: true });
//   };

//   const handleStop = () => {
//     setGameState({ isRunning: false });
//   };

//   // Code starts here
//   useEffect(() => {
//     const { speed, isRunning } = gameState;
//     const { current } = boardRef;
//     const prevState = current;

//     const speedChanged = prevState.current.speed !== speed;
//     const gameStarted = !prevState.gameState.isRunning && isRunning;
//     const gameStopped = prevState.gameState.isRunning && !isRunning;
//     // handleNextStep();
//     //   // If speed changed on running game, or game is started
//     //   // then set the buffer-rendering timer
//     //   // handle the next step .. useEffect
//     if ((gameState.isRunning && speedChanged) || gameStarted) {
//       setInterval(() => {
//         handleNextStep();
//       }, gameState.speed);
//     }
//     //   // Restarts the buffer-rendering timer when running game is stopped or speed changed
//     if ((gameState.isRunning && speedChanged) || gameStopped) {
//       clearInterval();
//     }
//   }, []);
//   //   console.log(prevState);
//   //   const speedChanged = prevState.gameState.speed !== gameState.speed;
//   //   const gameStarted = !prevState.gameState.isRunning && gameState.isRunning;
//   //   const gameStopped = prevState.gameState.isRunning && !gameState.isRunning;
//   //   const running = gameState.isRunning;

//   //   useEffect(() => {
//   //     if ((running && speedChanged) || gameStarted) {
//   //       setInterval(() => {
//   //         handleNextStep();
//   //       }, gameState.speed);

//   //       if ((running && speedChanged) || gameStopped) {
//   //         clearInterval();
//   //       }
//   //     }
//   //   });

//   return (
//     <>
//       <h1>Verbose Game Of Life</h1>
//       <BoardGrid
//         boardStatus={gameState.boardStatus}
//         toggleCellStatus={handleToggleCellStatus}
//       />
//     </>
//   );
// }

// export default Game;

import React, { useEffect } from "react";
import "./next-game.scss";

function Game() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d"); // set canvas element in DOM

  const resolution = 10;
  canvas.width = 250;
  canvas.height = 250;

  const cols = canvas.width / resolution;
  const rows = canvas.height / resolution;

  function buildGrid() {
    return new Array(cols)
      .fill(null)
      .map(() =>
        new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
      );
  }

  const grid = buildGrid();
  console.log(grid);
  const gridLength = grid.length;
  //   renderIt(grid);

  function renderIt(grid, gridLength) {
    // render
    for (let col = 0; col < gridLength; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];

        ctx.beginPath();
        ctx.rect(col * resolution, row * resolution, resolution, resolution);
        ctx.fillStyle = cell ? "white" : "black";
        ctx.fill();
        // ctx.stroke();
      }
    }
  }
  useEffect(() => {
    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d"); // set canvas element in DOM

    // grid = nextGen(grid);
    buildGrid();
  }, [grid]);

  //   const update = () => {
  //     let newGrid = nextGen(grid);
  //     renderIt(newGrid);
  //     requestAnimationFrame(update);
  //   };

  //   requestAnimationFrame(update);

  //   function nextGen(grid) {
  //     // create a copy of the grid
  //     const nextGen = grid.map((arr) => [...arr]);

  //     for (let col = 0; col < grid.length; col++) {
  //       for (let row = 0; row < grid[col].length; row++) {
  //         const cell = grid[col][row];
  //         let numNeighbors = 0;

  //         // find each cell then find all neighbors
  //         for (let i = -1; i < 2; i++) {
  //           for (let j = -1; j < 2; j++) {
  //             if (i === 0 && j === 0) {
  //               continue; // to next iteration of loop
  //             }
  //             const x_cell = col + i;
  //             const y_cell = row + j;

  //             // count neighbors
  //             if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
  //               const currentNeighbor = grid[col + i][row + j];
  //               numNeighbors += currentNeighbor;
  //             }
  //           }
  //         }

  //         // rules
  //         if (cell === 1 && numNeighbors < 2) {
  //           nextGen[col][row] = 0;
  //         } else if (cell === 1 && numNeighbors > 3) {
  //           nextGen[col][row] = 0;
  //         } else if (cell === 0 && numNeighbors === 3) {
  //           nextGen[col][row] = 1;
  //         }
  //       }
  //     }
  //     return nextGen;
  //   }

  return (
    <>
      <div className="board">{/* <canvas /> */}</div>
    </>
  );
}

export default Game;
