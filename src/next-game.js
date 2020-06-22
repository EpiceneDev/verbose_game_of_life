import React from "react";

// TODO Put in Less
const rows = 50;
const cols = 50;

// TODO may try Math.floor(Math.random()*4)
// 0.3 gives a 30% chance of being alive
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

// Creates the board grid and assigns it to a variable
// and a method allowing users to toggle the status of individual cells as props. 
// This method is defined on the main component where all the state of the application is held.
const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
    const handleClick = (r,c) => onToggleCellStatus(r,c);

    const tr = [];
    for (let r = 0; r < totalBoardRows; r++) {
        const td = [];
        for (let c = 0; c < totalBoardColumns; c++) {
            td.push(
                <td
                    key={`${r},${c}`}
                    className={boardStatus[r][c] ? 'alive' : 'dead'}
                    onClick={() => handleClick(r,c)}
                />
            );
        }
        tr.push(<tr key={r}>{td}</tr>);
    }
    return <table><tbody>{tr}</tbody></table>;
}

const Slider = () => {}

function Game() {
    const [gameState, setGameState] = useState({
        boardStatus: newBoardStatus(),
        generation: 0,
        isRunning: false,
        speed: 500
    })

    const startStopButton = () => {
        return gameState.isRunning ?
        <button type='button' onClick={handleStop}>Stop</button>
        <button type='button' onClick={handleStart}>Start</button>

    }

    const handleClearBoard = () => {
        setGameState({
            boardStatus: newBoardStatus(() => false),
            generation: 0
        })
    }

    const handleNewBoard = () => {
        setGameState({
            boardStatus: newBoardStatus(),
            generation: 0
        })
    }

    return (

    )
}

export default Game