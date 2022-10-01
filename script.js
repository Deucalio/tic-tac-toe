const markers = document.querySelectorAll(".marker")
let gameBoard = [
    [1, -1, 0],
    [0, 2, 4],
    [5, 2, 1]
]

Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
};

const cells = [...document.querySelectorAll(".card > button")]


const User = {};
const Computer = {};
let gameStart = false;

// If the user clicks the marker start the game
markers.forEach(marker => marker.addEventListener("click", () => {
    gameStart = true;
    marker.classList.add("active")

    // disable markers
    markers.forEach(marker => {
        marker.disabled = true;
    });


    User['marker'] = marker.textContent
    Computer['marker'] = (User.marker === "O") ? "X" : "O"
}))

cells.forEach(btn => btn.addEventListener("click", () => {
    // If user marker is O then it's user's turn
    if (User.marker === "O") {
        btn.textContent = User.marker;
        let [row, col] = btn.dataset.rowcol.split("");
        gameBoard[row - 1].splice(col - 1, 1, User.marker)
        let computerChoice = ComputerTurnGen()
        cells[computerChoice].textContent = Computer.marker;

        // for Computer (also disable the button where computer marks)
        [row, col] = cells[computerChoice].dataset.rowcol.split("");
        cells[computerChoice].disabled = true;
        // console.log("COMPUTER", row,col)
        gameBoard[row - 1].splice(col - 1, 1, Computer.marker)

    }
}))

const ComputerTurnGen = () => {

    //generates random num b/w 0 and 8

    let computerChoice = Math.floor(Math.random() * 9)

    // Check that the choice that computer generated is not already filled 
    let computerCell = cells.find(btn => btn.id == computerChoice)
    if (computerCell.textContent === "") {
        return computerChoice;
    } else {
        return ComputerTurnGen();
    }
}

// algorithm for determining the winner of tic tac toe
// For single every move:
//    checkDiagonals()
//    checkVerticals()
//    checkHorizontals()

setInterval(() => {
    // check horizontals;
    if ((gameBoard[0][0] == gameBoard[0][1]) && (gameBoard[0][1] == gameBoard[0][2])) {
        alert(gameBoard[0][0] + "WON")
    } else if ((gameBoard[1][0] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[1][2])) {
        alert(gameBoard[1][0] + "WON")
    } else if ((gameBoard[2][0] == gameBoard[2][1]) && (gameBoard[2][1] == gameBoard[2][2])) {
        alert(gameBoard[2][0] + "WON")
    }

    // check diagonally
    else if ((gameBoard[0][0] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[2][2])) {
        alert(gameBoard[0][0] + " " + "WON")
    } else if ((gameBoard[0][2] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[2][0])) {
        alert(gameBoard[0][2] + " " + "WON")
    }

    // check verticals;
    else if ((gameBoard[0][0] == gameBoard[1][0]) && (gameBoard[1][0] == gameBoard[2][0])) {
        alert(gameBoard[0][0] + " " + "WON")
    } else if ((gameBoard[0][1] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[2][1])) {
        alert(gameBoard[0][1] + " " + "WON")
    } else if ((gameBoard[0][2] == gameBoard[1][2]) && (gameBoard[1][2] == gameBoard[2][2])) {
        alert(gameBoard[0][2] + " " + "WON")
    }

}, 500)