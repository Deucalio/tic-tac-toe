const markers = document.querySelectorAll(".marker")
let gameBoard = [
    [1, -1, 0],
    [0, 2, 4],
    [5, 2, 1]
]

Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
};

const cells = [...document.querySelectorAll(".card > button")];
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal")
const restartBtn = document.querySelector("#restart")

let User = {};
let Computer = {};
let gameStart = false;

restartBtn.addEventListener("click", () => {
    restart();
})

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

    // if user marker is X then computer takes the first turn
    if (User['marker'] === "X") {
        let computerChoice = ComputerTurnGen()
        cells[computerChoice].textContent = Computer.marker;

        // for Computer (also disable the button where computer marks)
        let [row, col] = cells[computerChoice].dataset.rowcol.split("");
        cells[computerChoice].disabled = true;
        // console.log("COMPUTER", row,col)
        gameBoard[row - 1].splice(col - 1, 1, Computer.marker)



    }
}))

cells.forEach(btn => btn.addEventListener("click", () => {
    if (gameStart != false) {
        // If user marker is O then it's user's turn
        if (User.marker === "O") {
            if (btn.textContent !== User.marker) { //if user doesn't click the same button again
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
        } else {
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

function openModal(modal) {
    if (modal == null) {
        return
    }
    modal.classList.add("active")
    overlay.classList.add("active")


}

function closeModal(closeBtn) {
    if (closeBtn == null) {
        return
    }
    closeBtn.classList.remove("active")
    overlay.classList.remove("active")
}

// algorithm for determining the winner of tic tac toe
// For single every move:
//    checkDiagonals()
//    checkVerticals()
//    checkHorizontals()

setInterval(() => {
    // check horizontals;
    if ((gameBoard[0][0] == gameBoard[0][1]) && (gameBoard[0][1] == gameBoard[0][2])) {
        gameOver(gameBoard[0][0]);
    } else if ((gameBoard[1][0] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[1][2])) {
        gameOver(gameBoard[1][0]);
    } else if ((gameBoard[2][0] == gameBoard[2][1]) && (gameBoard[2][1] == gameBoard[2][2])) {
        gameOver(gameBoard[2][0]);
    }

    // check diagonally
    else if ((gameBoard[0][0] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[2][2])) {
        gameOver(gameBoard[0][0]);
    } else if ((gameBoard[0][2] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[2][0])) {
        gameOver(gameBoard[0][2]);
    }

    // check verticals;
    else if ((gameBoard[0][0] == gameBoard[1][0]) && (gameBoard[1][0] == gameBoard[2][0])) {
        gameOver(gameBoard[0][0]);
    } else if ((gameBoard[0][1] == gameBoard[1][1]) && (gameBoard[1][1] == gameBoard[2][1])) {
        gameOver(gameBoard[0][1]);
    } else if ((gameBoard[0][2] == gameBoard[1][2]) && (gameBoard[1][2] == gameBoard[2][2])) {
        gameOver(gameBoard[0][2]);
    }

}, 500)

const gameOver = (winnerMarker) => {
    overlay.dataset.content = winnerMarker + " " + "WON";
    gameStart = false;
    openModal(modal);
    cells.forEach(btn => btn.disabled = true)
    setTimeout(() => {
        closeModal(modal)
        // disable all buttons
    }, 3000);
}

const restart = () => {
    gameBoard = [
        [1, -1, 0],
        [0, 2, 4],
        [5, 2, 1]
    ]
    gameStart = false;
    markers.forEach(marker => {
        marker.classList.remove("active")
        marker.disabled = false;
    })
    cells.forEach(cell => {
        cell.textContent = ""
        cell.disabled = false;
    });

}