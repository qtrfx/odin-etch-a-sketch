const gridContainer = document.querySelector(".app-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");
const resetSketchButton = document.querySelector(".reset-sketch-button");

const GRID_DIMENSIONS = 960;
let tileSize = 50;

drawGrid(tileSize);

// Creates grid tiles based on the tile size given by calculating tile 
// dimensons to fit.
function drawGrid(tileSize) {
    gridContainer.replaceChildren();
    for (let i = 0; i < tileSize * tileSize; i++) {
        const gridTile = document.createElement("div");
        gridTile.classList.add("grid-tile");
        gridTile.style.opacity = 0;
        gridTile.style.height = `${GRID_DIMENSIONS / tileSize}px`;
        gridTile.style.width = `${GRID_DIMENSIONS / tileSize}px`;
        gridContainer.appendChild(gridTile);
    }
}

// Resets tile styles to their defaults.
function resetGrid() {
    const gridList = document.querySelectorAll(".grid-tile");
    gridList.forEach((tile) => {
        tile.classList.remove("color");
        tile.style.backgroundColor = "unset";
        tile.style.opacity = 0;
    });
}

// Asks the user for their desired grid size.
function changeTileSize(event) {
    let gridSizePrompt = "Enter your desired grid size. (1-100)";

    while (true) {
        const userInput = parseInt(prompt(gridSizePrompt));
        if (userInput <= 100 && userInput > 0) {
            tileSize = userInput;
            break;
        } else {
            gridSizePrompt =
                "Invalid Input, please input a number between 1-100.";
        }
    }

    drawGrid(tileSize);
}

// Colors grid tiles if they've not been colored yet.
function tintTile({ target }) {
    if (target.classList.contains("grid-tile")) {
        if (target.style.opacity < 1)
            target.style.opacity =
                roundToTwoDecimals(target.style.opacity) + 0.1;

        if (!target.classList.contains("color")) {
            target.classList.add("color");
            target.style.backgroundColor = getRandomColor();
        }
    }
}

// Generates a random RGB color to apply to uncolored tiles that
// have been hovered over.
function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function roundToTwoDecimals(numberToRound) {
    return Math.floor(numberToRound * 10) / 10;
}

gridContainer.addEventListener("mouseover", tintTile);
changeTileSizeButton.addEventListener("click", changeTileSize);
resetSketchButton.addEventListener("click", resetGrid);
