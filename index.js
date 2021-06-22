const gameboardSquares = document.querySelectorAll(".squares");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");

const square1 = document.getElementById("1");
const square2 = document.getElementById("2");
const square3 = document.getElementById("3");
const square4 = document.getElementById("4");
const square5 = document.getElementById("5");
const square6 = document.getElementById("6");
const square7 = document.getElementById("7");
const square8 = document.getElementById("8");
const square9 = document.getElementById("9");

const P1Score = document.getElementById("p1Score");
const P2Score = document.getElementById("p2Score");

const overlay = document.getElementById("overlay");
const mainBoard = document.querySelector(".mainBoard");

const winnerName = document.getElementById("winnerName");

const submitNameOneBtn = document.getElementById("submitNameOne");
const submitNameTwoBtn = document.getElementById("submitNameTwo");

let countTiles = 0;

let state = false;

const playerOne = {
    score: 0,
    name: "Player One",
    selection: "X"
}

const playerTwo = {
    score: 0,
    name: "Player Two",
    selection: "O"
}

let lastPlayer = "X"; // Start with player X first

gameboardSquares.forEach((square) => {
    square.addEventListener('click', (e) => {
        countTiles++;
        switch(lastPlayer) {
            case "X":
                addO(e);
                lastPlayer = "O";
                break;
            case "O":
                addX(e);
                lastPlayer = "X";
                break;
            

        }

    })
})

function addX(e) {
    if (e.target.classList.contains("newExes") || e.target.classList.contains("newOhes")) {
        e.target.classList.remove("newExes");
        e.target.classList.remove("newOhes");
        e.target.innerHTML = '';
    } else {
        e.target.classList.add("newExes");
        let textElement = document.createTextNode("X");
        let newPNode = document.createElement('p');
        newPNode.appendChild(textElement);
        e.target.appendChild(newPNode);
        checkWinner();
    }
}

function addO(e) {
    if (e.target.classList.contains("newExes") || e.target.classList.contains("newOhes")) {
        e.target.classList.remove("newOhes");
        e.target.classList.remove("newExes");
        e.target.innerHTML = '';
    } else {
        e.target.classList.add("newOhes");
        let textElement = document.createTextNode("O");
        let newPNode = document.createElement('p');
        newPNode.appendChild(textElement);
        e.target.appendChild(newPNode);
        checkWinner();
    }
}

function resetScreen() {
    gameboardSquares.forEach((square) => {
        if (square.classList.contains("newExes")) {
            square.classList.remove("newExes");

        } else if (square.classList.contains("newOhes")) {
            square.classList.remove("newOhes");
        }
        square.innerHTML = "";
    })
}

function resetPoints() {
    playerOne.score = 0;
    playerOne.name = "";

    playerTwo.score = 0;
    playerTwo.name = "";
}

resetBtn.addEventListener('click', () => {
    resetScreen();
    resetPoints();
    closeModal();
})

nextBtn.addEventListener('click', () => {
    resetScreen();
    closeModal();

})

function checkWinner() {
    if (square1.innerText === square2.innerText && square2.innerText === square3.innerText && square1.innerText !== "") {

        incrementWinner(square1);
    } else if (square4.innerText === square5.innerText && square5.innerText === square6.innerText && square6.innerText !== "") {
        incrementWinner(square4);
    } else if (square7.innerText === square8.innerText && square8.innerText === square9.innerText && square1.innerText !== "") {
        incrementWinner(square7);
    } else if (square1.innerText === square4.innerText && square4.innerText === square7.innerText && square7.innerText !== "") {
        incrementWinner(square1);
    } else if (square2.innerText === square5.innerText && square5.innerText === square8.innerText && square8.innerText !== "") {
        incrementWinner(square2);
    } else if (square3.innerText === square6.innerText && square6.innerText === square9.innerText && square9.innerText !== "") {
        incrementWinner(square3);
    } else if (square1.innerText === square5.innerText && square5.innerText === square9.innerText && square9.innerText !== "") {
        incrementWinner(square1);
    } else if (square3.innerText === square5.innerText && square5.innerText === square7.innerText && square7.innerText !== "") {
        incrementWinner(square3);
    }
    checkTieBreaker();
}

function incrementWinner(squares) {
    countTiles = 0;
    if (playerOne.selection === squares.innerText) {
        playerOne.score++;
        P1Score.textContent = playerOne.score;
        winnerModal(playerOne.name);
    } else {
        playerTwo.score++;
        P2Score.textContent = playerTwo.score;
        winnerModal(playerTwo.name);
    }
    
}

function checkTieBreaker() {
    if (countTiles === 9) {
        overlay.style.display = "block";
        mainBoard.setAttribute('class', 'blur');
        winnerName.textContent = "Tied";
    }
}

function winnerModal(name) {

    overlay.style.display = "block";
    mainBoard.setAttribute('class', 'blur');
    winnerName.textContent = name;
}

function closeModal() {
    overlay.style.display = "none";
    mainBoard.classList.remove('blur');
}

submitNameOneBtn.addEventListener('click', ()=> {
    const inputTextBoxOne = document.getElementsByName('playerName')[0];
    const playerName = document.getElementById("p1Name");

    playerOne.name = inputTextBoxOne.value;
    playerName.textContent = playerOne.name;

    inputTextBoxOne.value = "";
})

submitNameTwoBtn.addEventListener('click', ()=> {
    const inputTextBoxOne = document.getElementsByName('playerName')[1];
    const playerName = document.getElementById("p2Name");

    playerTwo.name = inputTextBoxOne.value; 
    playerName.textContent = playerTwo.name;

    inputTextBoxOne.value = "";

    
})