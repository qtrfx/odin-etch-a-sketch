const gridContainer = document.querySelector(".app-container");
const changeTileSizeButton = document.querySelector(".change-tile-size-button");

let tileSize = 50;

function drawGrid(tileSize) {
    if (parseInt(tileSize) > 100 || parseInt(tileSize) < 1) {
        return;
    }
    gridContainer.replaceChildren();
    for (let i = 0; i < tileSize * tileSize; i++) {
        const gridTile = document.createElement("div");
        gridTile.classList.add("grid-tile");
        gridTile.style.height = `${960 / tileSize}px`;
        gridTile.style.width = `${960 / tileSize}px`;
        gridContainer.appendChild(gridTile);
    }
}

drawGrid(tileSize);
gridContainer.addEventListener("mouseover", (event) => {
    console.log(event.target.className);
    if (event.target.className === "grid-tile") {
        event.target.classList.add("blue");
    }
});

changeTileSizeButton.addEventListener("click", (event) => {
    tileSize = prompt("Enter your desired grid size: (1-100)");
    drawGrid(tileSize);
});