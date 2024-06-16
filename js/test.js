//const boardSquares = document.getElementsByClassName("square");
function hide (evt) {
    evt.target.style.visibility = "hidden";
}

//console.log(boardSquares);

var tar = document.getElementById("text");

tar.addEventListener("click", hide);
