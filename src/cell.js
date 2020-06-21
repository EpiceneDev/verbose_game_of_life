import React from "react";

const Cell = ({ x, y, CELL_SIZE }) => {
  return (
    <div
      className="cell"
      style={{
        left: `${CELL_SIZE * x + 1}px`,
        right: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
      }}
    />
  );
};

export default Cell;
