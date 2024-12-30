const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resolution = 10; // Smaller cell size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const COLS = Math.floor(canvas.width / resolution);
const ROWS = Math.floor(canvas.height / resolution);

let grid = buildGrid();
let playing = false;

function buildGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
        .map(() => Math.floor(Math.random() * 2)));
}

function update() {
    if (!playing) return;
    grid = nextGen(grid);
    render(grid);
    setTimeout(() => requestAnimationFrame(update), 200); // Slower animation
}

/**
 * Generates the next generation of the grid based on the current state.
 * @param {Array} grid - The current state of the grid.
 * @returns {Array} - The next generation of the grid.
 */
function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            const numNeighbors = countNeighbors(grid, col, row);
            nextGen[col][row] = applyRules(cell, numNeighbors);
        }
    }
    return nextGen;
}

/**
 * Counts the number of active neighbors around a specific cell.
 * @param {Array} grid - The current state of the grid.
 * @param {number} col - The column index of the cell.
 * @param {number} row - The row index of the cell.
 * @returns {number} - The number of active neighbors.
 */
function countNeighbors(grid, col, row) {
    let numNeighbors = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            const x_cell = col + i;
            const y_cell = row + j;
            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                numNeighbors += grid[x_cell][y_cell];
            }
        }
    }
    return numNeighbors;
}

/**
 * Applies the rules of Conway's Game of Life to determine the next state of a cell.
 * @param {number} cell - The current state of the cell (0 or 1).
 * @param {number} numNeighbors - The number of active neighbors around the cell.
 * @returns {number} - The next state of the cell (0 or 1).
 */
function applyRules(cell, numNeighbors) {
    if (cell === 1 && numNeighbors < 2) return 0;
    if (cell === 1 && numNeighbors > 3) return 0;
    if (cell === 0 && numNeighbors === 3) return 1;
    return cell;
}

/**
 * Renders the grid on the canvas.
 * @param {Array} grid - The current state of the grid.
 */
function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            const numNeighbors = countNeighbors(grid, col, row);
            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? `hsl(${120 - numNeighbors * 10}, 100%, ${50 - numNeighbors * 5}%)` : '#FFE4E1';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function togglePlay() {
    playing = !playing;
    if (playing) {
        update();
    }
}

function reset() {
    grid = buildGrid();
    render(grid);
}

render(grid);