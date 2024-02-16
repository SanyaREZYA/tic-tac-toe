"use strict";

let currentPlayer = "Player1";
let gameOver = false;

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
        document.getElementById("player1Score").innerText = parseInt(document.getElementById("player1Score").innerText) + 1;
    } else {
        document.getElementById("player2Score").innerText = parseInt(document.getElementById("player2Score").innerText) + 1;
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
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "0";
    modalContainer.style.left = "0";
    modalContainer.style.width = "100%";
    modalContainer.style.height = "100%";
    modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modalContainer.style.display = "flex";
    modalContainer.style.justifyContent = "center";
    modalContainer.style.alignItems = "center";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "white";
    modalContent.style.padding = "20px";
    modalContent.style.width = "500px";
    modalContent.style.height = "100px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.textAlign = "center";
    modalContent.style.display = "flex";
    modalContent.style.flexDirection = "column";
    modalContent.style.justifyContent = "center";
    modalContent.style.alignItems = "center";

    const winnerText = document.createElement("p");
    winnerText.style.fontSize = "1.5em";
    winnerText.style.margin = "auto";
    if (text == "It's a tie!") {
        winnerText.innerText = "It's a tie!";
    } else {
        winnerText.innerText = `Player ${text} wins!`;
    }
    modalContent.appendChild(winnerText);

    const restartButton = document.createElement("button");
    restartButton.style.width = "150px";
    restartButton.style.height = "50px";
    restartButton.style.border = "1px #B88E2F solid";
    restartButton.style.backgroundColor = "#B88E2F";
    restartButton.style.fontSize = "16px";
    restartButton.style.color = "white";
    restartButton.innerText = "Restart";
    restartButton.style.marginTop = "auto";

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
    fields.forEach(field => {
        field.innerHTML = "";
    });
    currentPlayer = "Player1";
    gameOver = false;

    const modalContainer = document.querySelector(".modal-container");
    if (modalContainer) {
        modalContainer.remove();
    }
}


