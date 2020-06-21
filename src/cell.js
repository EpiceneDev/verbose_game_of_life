import React from "react";

const Cell = ({ x, y, cell_size }) => {
  return (
    <div
      className="cell"
      style={{
        left: `${cell_size * x + 1}px`,
        right: `${cell_size * y + 1}px`,
        width: `${cell_size - 1}px`,
        height: `${cell_size - 1}px`,
      }}
    />
  );
};

export default Cell;
