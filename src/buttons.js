import React from "react";

function Buttons({ gridSize, playButton, pauseButton, clear, slow, fast, seed }) {

	handleSelect = (e) => {
		gridSize(e);
	}

	render() {
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
						<MenuItem eventKey="1">20x10</MenuItem>
						<MenuItem eventKey="2">50x30</MenuItem>
						<MenuItem eventKey="3">70x50</MenuItem>
					</DropdownButton>
				</ButtonToolbar>
			</div>
			)
	}
}

export default Buttons