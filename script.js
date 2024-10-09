const gridContainer = document.querySelector(".grid-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");
const resetSketchButton = document.querySelector(".reset-sketch-button");
const toggleRainbowModeButton = document.querySelector(
    ".rainbow-toggle-button"
);
const toggleOpacityButton = document.querySelector(".opacity-toggle-button");
const buttonContainer = document.querySelector(".controls-container");
const colorPicker = document.querySelector(".color-picker-input");
const toggleRandomColorButton = document.querySelector(
    ".random-color-toggle-button"
);
const bodyReference = document.querySelector("body");
const toggleGridlinesButton = document.querySelector(".show-gridlines-button");

const GRID_DIMENSIONS = 960;
const RAINBOW_COLORS = {
    red: "rgb(228,3,3)",
    orange: "rgb(255,140,0)",
    yellow: "rgb(255,237,0)",
    green: "rgb(0,128,38)",
    blue: "rgb(0,76,255)",
    purple: "rgb(115,41,130)",
};
let currentRainbowColor = 0;

let tileSize = 50;
let rainbowMode = false;
let opacityMode = false;
let randomColorMode = false;
let isLeftButtonHeldDown;
let showGridlines = false;

drawGrid(tileSize);

gridContainer.addEventListener("mousemove", tintTile);
buttonContainer.addEventListener("click", handleButtonClick);
colorPicker.addEventListener("change", changeColor);
bodyReference.addEventListener("mousedown", toggleLeftClickActive);
bodyReference.addEventListener("mouseup", toggleLeftClickActive);

// Creates grid tiles based on the tile size given by calculating tile
// dimensons to fit.
function drawGrid(tileSize) {
    gridContainer.replaceChildren();
    for (let i = 0; i < tileSize * tileSize; i++) {
        const gridTile = document.createElement("div");
        gridTile.classList.add("grid-tile");
        gridTile.style.opacity = 1;
        gridTile.style.height = `${GRID_DIMENSIONS / tileSize}px`;
        gridTile.style.width = `${GRID_DIMENSIONS / tileSize}px`;
        gridTile.style.userSelect = "none";
        gridContainer.appendChild(gridTile);
    }
    currentRainbowColor = 0;
}

// Resets tile styles to their defaults.
function resetGrid() {
    const gridList = document.querySelectorAll(".grid-tile");
    gridList.forEach((tile) => {
        tile.classList.remove("color");
        tile.style.backgroundColor = "unset";
        tile.style.opacity = 1;
    });
    currentRainbowColor = 0;
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
    if (!isLeftButtonHeldDown) return;
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
            event.target.style.backgroundColor = getColor();
        }
    }
}

// Generates a random RGB color to apply to uncolored tiles that
// have been hovered over.
function getColor() {
    let color;
    if (rainbowMode) {
        const rainBowColors = Object.values(RAINBOW_COLORS);
        color = rainBowColors[currentRainbowColor++];
        if (currentRainbowColor > 5) {
            currentRainbowColor = 0;
        }
    } else if (randomColorMode) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        color = `rgb(${red}, ${green}, ${blue})`;
    } else {
        color = colorPicker.value;
    }
    return color;
}

function roundToTwoDecimals(numberToRound) {
    return Math.floor(numberToRound * 10) / 10;
}

function toggleRainbowMode() {
    rainbowMode = !rainbowMode;
    toggleRainbowModeButton.classList.toggle("toggleActive");
    if (randomColorMode) {
        randomColorMode = !randomColorMode;
        toggleRandomColorButton.classList.toggle("toggleActive");
    }
}

function toggleOpacity() {
    opacityMode = !opacityMode;
    toggleOpacityButton.classList.toggle("toggleActive");
}

function toggleRandomColors() {
    randomColorMode = !randomColorMode;
    toggleRandomColorButton.classList.toggle("toggleActive");
    if (rainbowMode) {
        rainbowMode = !rainbowMode;
        toggleRainbowModeButton.classList.toggle("toggleActive");
    }
}

function toggleLeftClickActive(event) {
    if (event.button === 0) {
        if (event.type === "mousedown") isLeftButtonHeldDown = true;
        else isLeftButtonHeldDown = false;
    }
}

function toggleGridlines() {
    showGridlines = !showGridlines;
    Array.from(gridContainer.children).forEach((tile) => {
        tile.classList.toggle("show-gridlines");
    });
}

function changeColor() {
    rainbowMode = false;
    randomColorMode = false;
    toggleRainbowModeButton.classList.remove("toggleActive");
    toggleRandomColorButton.classList.remove("toggleActive");
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
        case toggleRandomColorButton:
            toggleRandomColors();
            break;
        case toggleGridlinesButton:
            toggleGridlines();
            break;
    }
}