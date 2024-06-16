let legalSquares = [];
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesmages = document.getElementsByTagName("img");

setupBoardSquares();
setupPieces();

function setupBoardSquares() {
    for (let i  = 0; i < boardSquares.length; i++) {
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 8 - Math.floor(i/8);
        let column = String.fromCharCode(97 + (i%8));
        let square = boardSquares[i];
        square.id = column + row;
    }
}

function setupPieces() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", allowDrop);
        pieces[i].setAttribute("draggable", true)
        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;

    }
    for (let i = 0; i < piecesImages.length; i++) {
        piecesImages[i].setAttribute("draggable", true);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const piece = ev.target;
}