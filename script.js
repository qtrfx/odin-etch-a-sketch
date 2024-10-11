const gridContainer = document.querySelector(".grid-container");
const changeTileSizeSlider = document.querySelector(".change-tile-size-slider");
const resetSketchButton = document.querySelector(".reset-sketch-button");
// prettier-ignore
const toggleRainbowModeButton = document.querySelector(".rainbow-toggle-button");
const toggleOpacityButton = document.querySelector(".opacity-toggle-button");
const controlsContainer = document.querySelector(".controls-container");
const colorPicker = document.querySelector(".color-picker-input");
// prettier-ignore
const toggleRandomColorButton = document.querySelector(".random-color-toggle-button");
const bodyReference = document.querySelector("body");
const toggleGridlinesButton = document.querySelector(".show-gridlines-button");
// prettier-ignore
const changeTileSizeDisplay = document.querySelector(".change-tile-size-display");
const toggleEraserButton = document.querySelector(".eraser-toggle-button");

const RAINBOW_COLORS = {
  red: "rgb(228,3,3)",
  orange: "rgb(255,140,0)",
  yellow: "rgb(255,237,0)",
  green: "rgb(0,128,38)",
  blue: "rgb(0,76,255)",
  purple: "rgb(115,41,130)",
};

let currentRainbowColor = 0;
let gridDimensons = 32;
let rainbowMode = false;
let opacityMode = false;
let randomColorMode = false;
let isLeftButtonHeldDown;
let showGridlines = false;
let eraserMode = false;

// Initialise first grid on page load.
drawGrid(gridDimensons);

gridContainer.addEventListener("mouseover", tintTile);
controlsContainer.addEventListener("click", handleButtonClick);
controlsContainer.addEventListener("input", handleInputChange);
bodyReference.addEventListener("mousedown", handleLeftClick);
bodyReference.addEventListener("mouseup", toggleLeftClickActive);

// Creates grid tiles based on the tile size given by calculating tile
// dimensons to fit and wrapping them in a div to show consistent gridlines.
function drawGrid(gridDimensons) {
  gridContainer.replaceChildren();
  for (let i = 1; i <= gridDimensons; i++) {
    const gridRow = document.createElement("div");
    //randomColorMode = true; // just for testing;
    gridRow.classList.add("grid-row");

    for (let j = 1; j <= gridDimensons; j++) {
      const gridTile = document.createElement("div");

      gridTile.classList.add("grid-tile");
      gridRow.appendChild(gridTile);
    }
    gridContainer.appendChild(gridRow);
    currentRainbowColor = 0;
  }
}

// Resets tile styles to their defaults.
function resetGrid() {
  const gridList = document.querySelectorAll(".grid-tile");
  gridList.forEach((tile) => {
    tile.style.backgroundColor = "";
    tile.style.opacity = 0;
  });
  currentRainbowColor = 0;
}

// Redraws grid with user specified input and updates the current tilesize on
// the page.
function changeTileSize() {
  drawGrid(changeTileSizeSlider.value);
  changeTileSizeDisplay.innerText = `Grid Size: ${changeTileSizeSlider.value}x${changeTileSizeSlider.value}`;
}

// Colors grid tiles if they've not been colored yet.
function tintTile(event) {
  if (!isLeftButtonHeldDown) return;

  if (event.target.classList.contains("grid-tile")) {
    if (eraserMode) {
      event.target.style.backgroundColor = "";
      event.target.style.opacity = 0;
      return;
    }
    if (opacityMode) {
      if (event.target.style.opacity < 1) {
        event.target.style.opacity =
          roundToTwoDecimals(event.target.style.opacity) + 0.1;
      }
      if (event.target.style.backgroundColor != "") {
        return;
      }
    } else {
      event.target.style.opacity = 1;
    }

    event.target.style.backgroundColor = getColor();
  }
}

// Generates a random RGB color to apply to uncolored tiles that
// have been hovered over.
function getColor() {
  let color;
  // Iterates through the rainbow colors and loops on reaching the end, always
  // giving them out in order.
  if (rainbowMode) {
    const rainBowColors = Object.values(RAINBOW_COLORS);
    color = rainBowColors[currentRainbowColor++];

    if (currentRainbowColor > 5) {
      currentRainbowColor = 0;
    }
    // Picks random RGB values and combines them into an RGB string to return
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

// Toggles rainbowmode and untoggles conflicting modes.
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

// Toggles random colors mode and untoggles conflicting modes.
function toggleRandomColors() {
  randomColorMode = !randomColorMode;
  toggleRandomColorButton.classList.toggle("toggleActive");
  if (rainbowMode) {
    rainbowMode = !rainbowMode;
    toggleRainbowModeButton.classList.toggle("toggleActive");
  }
}

// Checks for left mouse button event and toggles on/off variable to use
// for checking if the current tile should be tinted.
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

// Toggle off conflicting modes when user inputs a color through the color picker
function changeColor() {
  rainbowMode = false;
  randomColorMode = false;
  toggleRainbowModeButton.classList.remove("toggleActive");
  toggleRandomColorButton.classList.remove("toggleActive");
}


function handleButtonClick({ target: buttonClicked, button: clickId }) {
  if (clickId !== 0) return;
  switch (buttonClicked) {
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
    case toggleEraserButton:
      toggleEraser();
  }
}

function handleInputChange({ target: inputChanged }) {
  switch (inputChanged) {
    case changeTileSizeSlider:
      changeTileSize();
      break;
    case colorPicker:
      changeColor();
      break;
  }
}

function handleLeftClick(event) {
  toggleLeftClickActive(event);
  if (event.target.classList.contains("grid-tile")) {
    tintTile(event);
  }
}

function toggleEraser() {
  eraserMode = !eraserMode;
  toggleEraserButton.classList.toggle("toggleActive");
}