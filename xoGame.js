var xoPlayerTurn, xoMoves, xoIsGameOver, xoSpan, xoRestartButton;
xoPlayerTurn = "x";
xoMoves = 0;
xoIsGameOver = false;
xoSpan = document.getElementsByClassName("xoSpan");
xoRestartButton = '<button class="xoButton" onclick="xoPlayAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

function play(y) {
    if (y.dataset.player == "none" && window.xoIsGameOver == false) {
        y.innerHTML = xoPlayerTurn;
        y.dataset.player = xoPlayerTurn;
        xoMoves++;
        if (xoPlayerTurn == "x") {
            xoPlayerTurn = "o";
        } else if (xoPlayerTurn == "o") {
            xoPlayerTurn = "x";
        }
    }
    /* Win Types */
    checkWinner(1, 2, 3);
    checkWinner(4, 5, 6);
    checkWinner(7, 8, 9);
    checkWinner(1, 4, 7);
    checkWinner(2, 5, 8);
    checkWinner(3, 6, 9);
    checkWinner(1, 5, 9);
    checkWinner(3, 5, 7);
    /* No Winner */
    if (xoMoves == 9 && xoIsGameOver == false) { xoDraw(); }
}

function checkWinner(a, b, c) {
    a--;
    b--;
    c--;
    if ((xoSpan[a].dataset.player === xoSpan[b].dataset.player) && (xoSpan[b].dataset.player === xoSpan[c].dataset.player) && (xoSpan[a].dataset.player === xoSpan[c].dataset.player) && (xoSpan[a].dataset.player === "x" || xoSpan[a].dataset.player === "o") && xoIsGameOver == false) {
        xoSpan[a].parentNode.className += " activeBox";
        xoSpan[b].parentNode.className += " activeBox";
        xoSpan[c].parentNode.className += " activeBox";
        xoGameOver(a);
    }
}

function xoPlayAgain() {
    document.getElementsByClassName("xoAlert")[0].parentNode.removeChild(document.getElementsByClassName("xoAlert")[0]);
    xoResetGame();
    window.xoIsGameOver = false;
    for (var k = 0; k < xoSpan.length; k++) {
        xoSpan[k].parentNode.className = xoSpan[k].parentNode.className.replace("activeBox", "");
    }
}

function xoResetGame() {
    for (i = 0; i < xoSpan.length; i++) {
        xoSpan[i].dataset.player = "none";
        xoSpan[i].innerHTML = "&nbsp;";
    }
    xoPlayerTurn = "x";
}

function xoGameOver(a) {
    //var gameOverAlertElement = "<b>GAME OVER </b><br><br> Player " + xoSpan[a].dataset.player.toUpperCase() + ' Win !!! <br><br>' + xoRestartButton; <------ Para crear alerta cuando se quiera dejar el juego por separado.
    
    //Crear div para cortar interacciones con el tablero
    var div = document.createElement("div");
    div.className = "xoAlert";
    
    //div.innerHTML = gameOverAlertElement;    <------ Para crear alerta cuando se quiera dejar el juego por separado.
    document.getElementsByTagName("body")[0].appendChild(div);
    window.xoIsGameOver = true;
    xoMoves = 0;
}

function xoDraw() {
    //Crear div para cortar interacciones con el tablero
    var div = document.createElement("div");
    div.className = "xoAlert";
    //
    document.getElementsByTagName("body")[0].appendChild(div);
    window.xoIsGameOver = true;
    xoMoves = 0;
}