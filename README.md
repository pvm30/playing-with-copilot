# Conway's Game of Life

This project is an implementation of Conway's Game of Life, a cellular automaton devised by the British mathematician John Horton Conway in 1970. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

## Features

- Randomly generated initial grid
- Play/Pause functionality
- Reset functionality
- Visualization of cell states with color variations based on the number of neighbors

## How to Run

1. Clone the repository or download the files.
2. Open `index.html` in a web browser.

## How to Run with Docker

1. Clone the repository or download the files.
2. Open a terminal and navigate to the project directory.
3. Build the Docker image:
    ```sh
    docker build -t conways-game-of-life .
    ```
4. Run the Docker container:
    ```sh
    docker run -p 8080:80 conways-game-of-life
    ```
5. Open a web browser and go to `http://localhost:8080` to see the application.
