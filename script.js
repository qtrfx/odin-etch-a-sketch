const gridContainer = document.querySelector(".app-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");
const resetSketchButton = document.querySelector(".reset-sketch-button");
const toggleRainbowModeButton = document.querySelector(
    ".rainbow-toggle-button"
);
const toggleOpacityButton = document.querySelector(".opacity-toggle-button");
const buttonContainer = document.querySelector(".button-container");

const GRID_DIMENSIONS = 960;
const RAINBOW_COLORS = {
    red: "rgb(228,3,3)",
    orange: "rgb(255,140,0)",
    yellow: "rgb(255,237,0)",
    green: "rgb(0,128,38)",
    blue: "rgb(0,76,255)",
    purple: "rgb(115,41,130)",
};
let tileSize = 50;
let rainbowMode = false;
let opacityMode = false;

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
function tintTile(event) {
    if (event.target.classList.contains("grid-tile")) {
        if (opacityMode) {
            if (event.target.style.opacity < 1)
                event.target.style.opacity =
                    roundToTwoDecimals(event.target.style.opacity) + 0.1;
        } else {
            event.target.style.opacity = 1;
        }

        if (!event.target.classList.contains("color")) {
            event.target.classList.add("color");
            event.target.style.backgroundColor = getRandomColor();
        }
    }
}

// Generates a random RGB color to apply to uncolored tiles that
// have been hovered over.
function getRandomColor() {
    let color;
    if (rainbowMode) {
        const rainBowColors = Object.values(RAINBOW_COLORS);
        color = rainBowColors[Math.floor(Math.random() * rainBowColors.length)];
    } else {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        color = `rgb(${red}, ${green}, ${blue})`;
    }
    return color;
}

function roundToTwoDecimals(numberToRound) {
    return Math.floor(numberToRound * 10) / 10;
}

function toggleRainbowMode() {
    rainbowMode = !rainbowMode;
    toggleRainbowModeButton.classList.toggle("toggleActive");
}

function toggleOpacity() {
    opacityMode = !opacityMode;
    toggleOpacityButton.classList.toggle("toggleActive");
}

function handleButtonClick({ target: buttonClicked, button: clickId }) {
    if (clickId !== 0) return;
    switch (buttonClicked) {
        case changeTileSizeButton:
            changeTileSize();
            break;
        case resetSketchButton:
            resetGrid();
            break;
        case toggleRainbowModeButton:
            toggleRainbowMode();
            break;
        case toggleOpacityButton:
            toggleOpacity();
            break;
    }
}

gridContainer.addEventListener("mouseover", tintTile);
buttonContainer.addEventListener("click", handleButtonClick);
