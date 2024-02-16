"use strict";

let currentPlayer = "Player1";
let gameOver = false;
let combinationLength = 3;
let newSize;

const player1Score = document.querySelector("#player1Score");
const player2Score = document.querySelector("#player2Score");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const playground = document.querySelector("#playground");
player1.style.scale = "120%";
player2.style.scale = "100%";

document.addEventListener("DOMContentLoaded", function () {
    const fields = document.querySelectorAll(".field");
    const fieldSizeInput = document.querySelector("#fieldSizeChanger");
    const fieldSizeButton = document.querySelector("#sizeButton");
    const combSizeInput = document.querySelector("#winCombSizeChanger");
    const combSizeButton = document.querySelector("#combButton");

    fields.forEach(field => {
        field.addEventListener("click", function () {
            if (!gameOver) {
                handleMove(field.id);
            }
        });
    });

    fieldSizeButton.addEventListener("click", function () {
        newSize = parseInt(fieldSizeInput.value);
        const isValidValue = !isNaN(newSize) && newSize >= 3 && newSize <= 100;
        if (isValidValue) {
            changeFieldSize(newSize);
        } else {
            alert("Please enter a valid size (from 3 to 100).");
        }
    });

    combSizeButton.addEventListener("click", function () {
        const newCombSize = parseInt(combSizeInput.value);
        const isValueValid = !isNaN(newCombSize) && newCombSize >= 3 && newCombSize <= 100 && newCombSize <= newSize;
        if (isValueValid) {
            combinationLength = newCombSize;
        } else {
            alert(`Please enter a valid size (from 3 to ${newSize}).`);
        }
    });
});

function handleMove(fieldId) {
    const field = document.getElementById(fieldId);

    if (!field.innerHTML && !gameOver) {
        const image = currentPlayer === "Player1" ? "images/x_sprite.jpg" : "images/o_sprite.jpg";
        field.innerHTML = `<img src="${image}" alt="${currentPlayer}">`;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === "Player1" ? "Player2" : "Player1";

    if (currentPlayer == "Player1") {
        player1.style.scale = "120%";
        player2.style.scale = "100%";
    } else {
        player1.style.scale = "100%";
        player2.style.scale = "120%";
    }
}

function checkWinner() {
    const size = Math.sqrt(document.querySelectorAll(".field").length);
    const fields = Array.from(document.querySelectorAll(".field"));
    const fieldValues = fields.map(field => field.innerHTML);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= size - combinationLength; j++) {
            const row = fieldValues.slice(i * size + j, i * size + j + combinationLength);
            if (checkCombination(row)) {
                announceWinner(currentPlayer);
                return;
            }
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= size - combinationLength; j++) {
            const column = [];
            for (let k = 0; k < combinationLength; k++) {
                column.push(fieldValues[(j + k) * size + i]);
            }
            if (checkCombination(column)) {
                announceWinner(currentPlayer);
                return;
            }
        }
    }

    for (let i = 0; i <= size - combinationLength; i++) {
        for (let j = 0; j <= size - combinationLength; j++) {
            const diagonal1 = [];
            const diagonal2 = [];
            for (let k = 0; k < combinationLength; k++) {
                diagonal1.push(fieldValues[(i + k) * size + j + k]);
                diagonal2.push(fieldValues[(i + k) * size + j + combinationLength - k - 1]);
            }
            if (checkCombination(diagonal1) || checkCombination(diagonal2)) {
                announceWinner(currentPlayer);
                return;
            }
        }
    }

    if (fields.every(field => field.innerHTML !== "")) {
        announceTie();
    }
}

function checkCombination(combination) {
    return combination.every(value => value === combination[0] && value !== "");
}

function announceWinner(winner) {
    const modal = createModal(winner);
    document.body.appendChild(modal);

    if (winner === "Player1") {
        player1Score.innerText = parseInt(player1Score.innerText) + 1;
    } else {
        player2Score.innerText = parseInt(player2Score.innerText) + 1;
    }

    gameOver = true;
}

function announceTie() {
    const modal = createModal("It's a tie!");
    document.body.appendChild(modal);
    gameOver = true;
}

function createModal(text) {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const winnerText = document.createElement("p");
    winnerText.classList.add("winner-text");

    if (text == "It's a tie!") {
        winnerText.innerText = "It's a tie!";
    } else {
        winnerText.innerText = `Player ${text} wins!`;
    }
    modalContent.appendChild(winnerText);

    const restartButton = document.createElement("button");
    restartButton.classList.add("button");
    restartButton.classList.add("modal-content__button");
    restartButton.innerText = "Restart";

    restartButton.addEventListener("click", function () {
        resetGame();
    });

    modalContent.appendChild(winnerText);
    modalContent.appendChild(restartButton);
    modalContainer.appendChild(modalContent);

    return modalContainer;
}

function resetGame() {
    const fields = document.querySelectorAll(".field");
    const modalContainer = document.querySelector(".modal-container");

    fields.forEach(field => {
        field.innerHTML = "";
    });
    currentPlayer = "Player1";
    gameOver = false;

    player1.style.scale = "120%";
    player2.style.scale = "100%";

    if (modalContainer) {
        modalContainer.remove();
    }
}

function changeFieldSize(newSize) {
    playground.innerHTML = "";

    let width = (playground.clientWidth / newSize) -2;

    for (let i = 1; i <= newSize * newSize; i++) {
        const field = document.createElement("div");
        field.classList.add("field");
        field.id = "field" + i;
        field.style.width = width + "px";
        field.style.height = width + "px";
        console.log(i);
        playground.appendChild(field);
    }
    
    const fields = document.querySelectorAll(".field");
    fields.forEach(field => {
        field.addEventListener("click", function () {
            if (!gameOver) {
                handleMove(field.id);
            }
        });
    });

    resetGame();
}