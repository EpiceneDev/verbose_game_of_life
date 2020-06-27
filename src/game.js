import React, { Component } from "react";

const rows = 50;
const cols = 50;

// Create a new board with 30% chance of being alive
//
const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = cellStatus();
    }
  }
  return grid;
};

// Create the the cells and add their status to the board.
// Used to set current state of board as well as reset the board
// with chosen status (dead/alive.)
const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
  const handleClick = (r, c) => onToggleCellStatus(r, c);

  const tr = [];
  for (let r = 0; r < rows; r++) {
    const td = [];
    for (let c = 0; c < cols; c++) {
      td.push(
        <td
          key={`${r},${c}`}
          className={boardStatus[r][c] ? "alive" : "dead"}
          onClick={() => handleClick(r, c)}
        />
      );
    }
    tr.push(<tr key={r}>{td}</tr>);
  }
  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
};

// Helper function to change speed
const Slider = ({ speed, onSpeedChange }) => {
  const handleChange = (e) => onSpeedChange(e.target.value);

  return (
    <input
      type="range"
      min="50"
      max="1000"
      step="50"
      value={speed}
      onChange={handleChange}
    />
  );
};

class App extends Component {
  state = {
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500,
  };

  runStopButton = () => {
    return this.state.isGameRunning ? (
      <button type="button" onClick={this.handleStop}>
        Stop
      </button>
    ) : (
      <button type="button" onClick={this.handleRun}>
        Start
      </button>
    );
  };

  handleClearBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(() => false),
      generation: 0,
    });
  };

  handleNewBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(),
      generation: 0,
    });
  };

  handleToggleCellStatus = (r, c) => {
    // Deep clone (because of nested objects) the board
    // to create the previous state
    const toggleBoardStatus = (prevState) => {
      const clonedBoardStatus = JSON.parse(
        JSON.stringify(prevState.boardStatus)
      );
      // Toggle the cell status
      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
      return clonedBoardStatus;
    };

    // Set the board state to the cloned board
    this.setState((prevState) => ({
      boardStatus: toggleBoardStatus(prevState),
    }));
  };

  // This is the run method. It sets the new video buffer by
  // cloning the current one and then send it through conditional
  // operations to determine the neighbors and set the next
  // generation of the displayed video buffer.
  handleStep = () => {
    const nextStep = (prevState) => {
      // Change board
      const boardStatus = prevState.boardStatus;

      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));

      const amountTrueNeighbors = (r, c) => {
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
        ];

        // reduce the alive neighbors into trueNeighbors when looking at each neighbor:
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard = x >= 0 && x < rows && y >= 0 && y < cols;

          // Count alive neighbors
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      // Now that we know the number of alive neighbors,
      // apply the rules of the game to determine the status
      // of the cells.
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const totalTrueNeighbors = amountTrueNeighbors(r, c);

          if (!boardStatus[r][c]) {
            if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3)
              clonedBoardStatus[r][c] = false;
          }
        }
      }

      return clonedBoardStatus;
    };

    // Set state with function calls syncronously which
    // is better for setting state immediately.
    this.setState((prevState) => ({
      boardStatus: nextStep(prevState),
      generation: prevState.generation + 1,
    }));
  };

  handleSpeedChange = (newSpeed) => {
    this.setState({ speed: newSpeed });
  };

  handleRun = () => {
    this.setState({ isGameRunning: true });
  };

  handleStop = () => {
    this.setState({ isGameRunning: false });
  };

  // Not called at the initial render, the componentDidUpdate
  // will be invoked immediately after updating occurs.
  componentDidUpdate(prevProps, prevState) {
    const { isGameRunning, speed } = this.state;
    const speedChanged = prevState.speed !== speed;
    const gameStarted = !prevState.isGameRunning && isGameRunning;
    const gameStopped = prevState.isGameRunning && !isGameRunning;

    // if game needs to restart due to stop or speed change,
    // reset the interval for continuous runs, effectively stopping.
    if ((isGameRunning && speedChanged) || gameStopped) {
      clearInterval(this.timerID);
    }

    // If game is started or speed changed while running,
    // set the interval time of continous renders
    // to be dependent on the speed (interval time.)
    if ((isGameRunning && speedChanged) || gameStarted) {
      this.timerID = setInterval(() => {
        this.handleStep();
      }, speed);
    }
  }

  render() {
    const { boardStatus, isGameRunning, generation, speed } = this.state;

    return (
      <div>
        <h1>GAME OF LIFE</h1>
        <BoardGrid
          boardStatus={boardStatus}
          onToggleCellStatus={this.handleToggleCellStatus}
        />
        <div className="flexRow upperControls">
          <span>
            {"+ "}
            <Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
            {" -"}
          </span>
          {`Generation: ${generation}`}
        </div>
        <div className="flexRow lowerControls">
          {this.runStopButton()}
          <button
            type="button"
            disabled={isGameRunning}
            onClick={this.handleStep}
          >
            Step
          </button>
          <button type="button" onClick={this.handleClearBoard}>
            Clear Board
          </button>
          <button type="button" onClick={this.handleNewBoard}>
            New Board
          </button>
        </div>
        <div className="instructions">
          <h1>INSTRUCTIONS FOR THE GAME</h1>
          {/* <br /> */}
          <h3>
            Who is born? Who lives and who dies?... <br />
            Check what each neighbor is doing and apply the following rules:{" "}
          </h3>
          <p>
            - Each ALIVE cell with FEWER THAN 2 neighbors DIES. <br />
            - Each ALIVE cellwith 4 OR MORE neighbors DIES, as if it were
            crowded out. <br />- Each ALIVE cell with TWO OR THREE neighbors
            SURVIVES! Imagine that.
          </p>
          <p>Each DEAD cell with 2 OR 3 neighbors becomes ALIVE.</p>
        </div>
      </div>
    );
  }
}

export default App;
