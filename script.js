const gridContainer = document.querySelector(".app-container");

for (let i = 0; i < 16; i++) {
    const gridTile = document.createElement("div");
    gridTile.classList.add("grid-tile");
    gridContainer.appendChild(gridTile);
}
