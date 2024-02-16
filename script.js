"use strict";

let currentPlayer = "Player1";
let gameOver = false;

const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
player1.style.scale = "120%";
player2.style.scale = "100%";

document.addEventListener("DOMContentLoaded", function () {
    const fields = document.querySelectorAll(".field");
    fields.forEach(field => {
        field.addEventListener("click", function () {
            if (!gameOver) {
                handleMove(field.id);
            }
        });
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
    const lines = [
        ["field1", "field2", "field3"],
        ["field4", "field5", "field6"],
        ["field7", "field8", "field9"],
        ["field1", "field4", "field7"],
        ["field2", "field5", "field8"],
        ["field3", "field6", "field9"],
        ["field1", "field5", "field9"],
        ["field3", "field5", "field7"]
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        const fieldA = document.getElementById(a).innerHTML;
        const fieldB = document.getElementById(b).innerHTML;
        const fieldC = document.getElementById(c).innerHTML;

        if (fieldA && fieldA === fieldB && fieldA === fieldC) {
            announceWinner(currentPlayer);
            return;
        }
    }

    if (document.querySelectorAll(".field:not(:empty)").length === 9) {
        announceTie();
        return;
    }
}

function announceWinner(winner) {
    const modal = createModal(winner);
    document.body.appendChild(modal);

    if (winner === "Player1") {
        player1Score.innerText = parseInt(player1Score.innerText) + 1;
    } else {
        player1Score.innerText = parseInt(player2Score.innerText) + 1;
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
    restartButton.classList.add("modal-content__button");
    restartButton.innerText = "Restart";

    restartButton.addEventListener("click", function () {
        resetGame();
    });

    restartButton.addEventListener("mouseover", function () {
        restartButton.style.backgroundColor = "white";
        restartButton.style.color = "#B88E2F";
    });

    restartButton.addEventListener("mouseout", function () {
        restartButton.style.backgroundColor = "#B88E2F";
        restartButton.style.color = "white";
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