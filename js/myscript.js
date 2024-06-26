let legalSquares = [];
let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

setupBoardSquares();
setupPieces();

function setupBoardSquares() {
    for (let i  = 0; i < boardSquares.length; i++) {
        // We setup drag for the <div> <img> </div>
        boardSquares[i].addEventListener("dragover", allowDrop);
        //setup all the squares of the board to be droppable.
        boardSquares[i].addEventListener("drop", drop);
        //calculate and set square Id to track later.
        let row = 8 - Math.floor(i/8);
        let column = String.fromCharCode(97 + (i%8));
        let square = boardSquares[i];
        square.id = column + row;
    }
}

function setupPieces() {
    for (let i = 0; i < pieces.length; i++) {
        //add event listener to every pieces to be draggable
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        //setup pieces Id. 

        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }
    for (let i = 0; i < piecesImages.length; i++) {
        //have to set img tag attribute draggable to false.
        piecesImages[i].setAttribute("draggable", false);
    }
}

function allowDrop(ev) {
    //prevent default to allow the drop, without this the div wont drop (by default)
    ev.preventDefault();
}

function drag(ev) {
    //ev.target is the <div>  </div> only. not the <img> inside.
    const piece = ev.target;
    //get piece color
    const pieceColor = piece.getAttribute("color");
    if ((isWhiteTurn && pieceColor == "white") || (!isWhiteTurn && pieceColor == "black")) {
        //set data of text to piece id. Later will access this in drop
        ev.dataTransfer.setData("text", piece.id);
    } 
    

}

function drop(ev) {
    //in this case we can preventDefault or not. because default action will open as link for some elements
    ev.preventDefault();
    //data = piece id
    let data = ev.dataTransfer.getData("text");
    //track back to the piece with Id 
    const piece = document.getElementById(data);
    if (!piece) {
        console.log("not ur dumb turn");
        return;
    }
    //currentTarget is boardSquare[i] we set up earlier.

    const destinationSquare = ev.currentTarget;
    //access Square Id. thus we change the div into to this new square. 
    let destinationSquareId = destinationSquare.id;
    //get piece type of piece
    let pieceType = piece.getAttribute("id");
    console.log(pieceType);

    pieceType = pieceType.slice(0,pieceType.length-2);
    console.log(pieceType);
    //original code work not so fine so got corrected

    //check if the destination already have pieces? If yes what color ?
    // if (isSquareOccupied(destinationSquare) == "blank") {
    //     //appendChild piece => move the div of the piece in to this new square div (with square Id)
    //     destinationSquare.appendChild(piece); 
    //     console.log(piece.getAttribute("color"));
    //     //change turn
    //     isWhiteTurn = !isWhiteTurn;
    //     return;
    // } 
    // if (isSquareOccupied(destinationSquare) != "blank") {
    //     //check if destination square have a piece. then remove the piece there first
    //     while (destinationSquare.firstChild) {
    //         destinationSquare.removeChild(destinationSquare.firstChild);
    //     }
    //     //move the later piece to the square
    //     destinationSquare.appendChild(piece);
    //     isWhiteTurn = !isWhiteTurn;
    //     return;
    // }
    switch (pieceType) {
        case "rook":
            if (!checkLegalMoveRook(piece.getAttribute("id"), destinationSquare.getAttribute("id"))) {
                console.log("ur rook dumb"); 
                return;
            } else break;
        case "bishop":
            if (!checkLegalMoveBishop(piece.getAttribute("id"), destinationSquare.getAttribute("id"))) {
                console.log("ur bishop dumb"); 
                return;
            } else break;
        case "knight":
            if (!checkLegalMoveKnight(piece.getAttribute("id"),destinationSquare.getAttribute("id"))) {
                console.log("ur knight dumb");
                return;
            } else break;
        case "queen":
            if (!checkLegalMoveBishop(piece.getAttribute("id"),destinationSquare.getAttribute("id")) && !checkLegalMoveRook(piece.getAttribute("id"), destinationSquare.getAttribute("id"))) {
                console.log("ur queen dumb");
                return;
            } else break;
        case "king":
            if (!checkLegalMoveKing(piece.getAttribute("id"),destinationSquare.getAttribute("id"))) {
                console.log("ur king dumb");
                return;
            } else break;
    }
    
    //check turn prevent error
    
    console.log(destinationSquare.firstElementChild);
    //if the square has piece and = color vs the piece moving => dumb 
    if (isSquareOccupied(destinationSquare) == piece.getAttribute("color")) {
        console.log("u dumb");
        return;
    } else {
        let takenPiece = destinationSquare.getElementsByClassName("piece");
        console.log(takenPiece[0]);
        //correct move (either no piece in square or piece with different color)
        if (takenPiece[0]) {
            //which piece take which piece
            console.log(piece.getAttribute("color"), " take ", isSquareOccupied(destinationSquare));
            //remove the piece taken
            //destinationSquare.removeChild(destinationSquare.firstElementChild);
            destinationSquare.removeChild(takenPiece[0]);
        }
        //put the other piece into the square
        destinationSquare.appendChild(piece);
        
        pieceType += destinationSquare.getAttribute("id");
        //pieceId after moving
        piece.setAttribute("id",pieceType);
        //change turn
        isWhiteTurn = !isWhiteTurn;
        return;
    }
    

}

function isSquareOccupied(square) {
    if (square.querySelector(".piece")) {
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    } else return "blank";
}

function checkLegalMoveRook(pieceId, squareId) {
    

    if ((pieceId[pieceId.length - 1] == squareId[squareId.length - 1] || pieceId[pieceId.length - 2] == squareId[squareId.length - 2])) {
        return true;
    } else return false;
}

function checkLegalMoveBishop(pieceId,squareId) {
    // console.log(pieceId[pieceId.length - 1], " ", squareId[squareId.length - 1]);
    // console.log(pieceId[pieceId.length - 2], " ", squareId[squareId.length - 2]);
    
    // console.log(pieceId[pieceId.length-1]-squareId[squareId.length-1]);
    // console.log(pieceId.charCodeAt(pieceId.length-2) - squareId.charCodeAt(squareId.length-2));

    if (Math.abs(pieceId[pieceId.length-1]-squareId[squareId.length-1]) == Math.abs(pieceId.charCodeAt(pieceId.length-2) - squareId.charCodeAt(squareId.length-2))) {
        return true;
    } else return false;
}

function checkLegalMoveKnight(pieceId, squareId) {
    
    // row = 1 and column = 2, row = 2 and column = 1 => Knight move
    if (Math.abs((pieceId[pieceId.length-1] - squareId[squareId.length-1]) * (pieceId.charCodeAt(pieceId.length-2) - squareId.charCodeAt(squareId.length-2))) == 2) {
        return true;
    } else return false;
}

function checkLegalMoveKing(pieceId, squareId) {
    if (Math.abs((pieceId[pieceId.length-1] - squareId[squareId.length-1])) < 2 && Math.abs(pieceId.charCodeAt(pieceId.length-2) - squareId.charCodeAt(squareId.length-2)) < 2) {
        return true;
    } else return false;
}