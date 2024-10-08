const gridContainer = document.querySelector(".app-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");

}
changeTileSizeButton.addEventListener("click", (event) => {
    tileSize = prompt("Enter your desired grid size: (1-100)");
    drawGrid(tileSize);
});