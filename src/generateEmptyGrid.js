import React from "react";

const rowsSize = 50;
const colsSize = 50;

function GenerateEmptyGrid() {
  const rows = [];
  for (let i = 0; i < rowsSize; i++) {
    rows.push(Array.from(Array(colsSize), () => 0));
  }

  return rows;
}

export default GenerateEmptyGrid;
