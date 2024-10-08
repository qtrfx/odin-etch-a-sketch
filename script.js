const gridContainer = document.querySelector(".app-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");
const resetSketchButton = document.querySelector(".reset-sketch-button");

const GRID_DIMENSIONS = 960;

let tileSize = 50;

function drawGrid(tileSize) {
    gridContainer.replaceChildren();
    for (let i = 0; i < tileSize * tileSize; i++) {
        const gridTile = document.createElement("div");
        gridTile.classList.add("grid-tile");
        gridTile.style.height = `${GRID_DIMENSIONS / tileSize}px`;
        gridTile.style.width = `${GRID_DIMENSIONS / tileSize}px`;
        gridContainer.appendChild(gridTile);
    }
}

drawGrid(tileSize);

function resetGrid() {
    const gridList = document.querySelectorAll(".blue");
    gridList.forEach((tile) => {
        tile.classList.remove("blue");
    });
}

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

function tintTile(event) {
    if (event.target.className === "grid-tile") {
        event.target.classList.add("blue");
    }
}

gridContainer.addEventListener("mouseover", tintTile);
changeTileSizeButton.addEventListener("click", changeTileSize);
resetSketchButton.addEventListener("click", resetGrid);
