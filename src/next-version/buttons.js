import React from "react";
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

function Buttons({
  gridSize,
  playButton,
  pauseButton,
  clear,
  slow,
  fast,
  seed,
}) {
  const handleSelect = (e) => {
    gridSize(e);
  };

  return (
    <div className="center">
      <ButtonToolbar>
        <button className="btn btn-default" onClick={playButton}>
          Play
        </button>
        <button className="btn btn-default" onClick={pauseButton}>
          Pause
        </button>
        <button className="btn btn-default" onClick={clear}>
          Clear
        </button>
        <button className="btn btn-default" onClick={slow}>
          Slow
        </button>
        <button className="btn btn-default" onClick={fast}>
          Fast
        </button>
        <button className="btn btn-default" onClick={seed}>
          Seed
        </button>
        <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
          <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
          <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );
}

export default Buttons;
