const mineGrid = document.getElementById("mineGrid");
let mineLockGame = false;
// TRUE = VISIBLE MINES / FALSE = IONVISIBLE MINES. But u need change the background color if u want to see the marks.
const testMode = false;
generateMineGrid();

// Generate 10 * 10 mineGrid
function generateMineGrid() {
    mineLockGame = false;
    mineGrid.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        row = mineGrid.insertRow(i);
        for (var j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () { initMines(this); };
            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    generateMines();
}

// Generate mines randomly
function generateMines() {
    // Add 20 mines to game
    for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = mineGrid.rows[row].cells[col];
        cell.setAttribute("mine", "true");
        if (testMode) {
            cell.innerHTML = "X";
        }
    }
}

// Highlight all mines red
function revealMines() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = mineGrid.rows[i].cells[j];
            if (cell.getAttribute("mine") == "true") {
                cell.className = "mine";
            }
        }
    }
}

function checkGameComplete() {
    var gameComplete = true;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((mineGrid.rows[i].cells[j].getAttribute("mine") == "false") && (mineGrid.rows[i].cells[j].innerHTML == "")) {
                gameComplete = false;
            }
        }
    }
    if (gameComplete) {
        revealMines();
    }
}

function initMines(cell) {
    // Check game completed or no
    if (mineLockGame) {
        return;
    } else {
        // Check user clicked on mine
        if (cell.getAttribute("mine") == "true") {
            revealMines();
            mineLockGame = true;
        } else {
            cell.className = "active";
            // Display number of mines around cell
            var mineCount = 0;
            var cellRow = cell.parentNode.rowIndex;
            var cellCol = cell.cellIndex;
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    if (mineGrid.rows[i].cells[j].getAttribute("mine") == "true") {
                        mineCount++;
                    }
                }
            }
            cell.innerHTML = mineCount;
            if (mineCount == 0) {
                // if cell dont have mine
                for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                    for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                        if (mineGrid.rows[i].cells[j].innerHTML == "") {
                            initMines(mineGrid.rows[i].cells[j]);
                        }
                    }
                }
            }
            checkGameComplete();
        }
    }
}