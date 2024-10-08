const gridContainer = document.querySelector(".app-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");
const resetSketchButton = document.querySelector(".reset-sketch-button");

const GRID_DIMENSIONS = 960;
let tileSize = 50;

drawGrid(tileSize);

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

function resetGrid() {
    const gridList = document.querySelectorAll(".grid-tile");
    gridList.forEach((tile) => {
        tile.classList.remove("color");
        tile.style.backgroundColor = "unset";
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
        if (!event.target.classList.contains("color")) {
            event.target.classList.add("color");
            event.target.style.backgroundColor = getRandomColor();
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

gridContainer.addEventListener("mouseover", tintTile);
changeTileSizeButton.addEventListener("click", changeTileSize);
resetSketchButton.addEventListener("click", resetGrid);
