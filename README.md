# Game of Life

Made from Conway's Game of Life rules.
For more details on the game, visit [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)


## Technologies

* React
* JavaScript
* HTML
* SASS

## Details

The universe of the Game of Life is an two-dimensional grid (known as "world") of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with the eight neighbors around it, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

* Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
* Any live cell with two or three live neighbors lives on to the next generation.
* Any live cell with more than three live neighbors dies, as if by overpopulation.
* Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

An initial pattern is seeded in the grid. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

[Play the game](https://frosty-johnson-910aa2.netlify.app/)

## To Run

npm install
npm start

## Future build

1. Pop-up instructions

2. Right now it is desktop only. Needs to scale for mobile/tablets.

3. Better styling... always.