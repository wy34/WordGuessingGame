let game;

const startGameBtn = document.querySelector("#btn__reset");
const keyBoard = document.querySelector("#qwerty");
const keyBoardBtns = keyBoard.querySelectorAll("button");
let overlay = document.querySelector("#overlay");
let alreadyPressed = [];




startGameBtn.addEventListener("click", function() {
    game = new Game();
    game.startGame();
})

keyBoard.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        game.handleInteraction(e.target);
    }
})


document.addEventListener("keypress", (e) => {
    if (overlay.style.display === ""  || overlay.style.display === "flex") {
        e.preventDefault();
    } else {
        keyPressEvent(e)
    }
})


function keyPressEvent(e) {
    if (e.code.indexOf("Key") !== -1 && alreadyPressed.indexOf(e.key) === -1) {
        alreadyPressed.push(e.key)
        let matchingBtn = [...keyBoardBtns].find(btn => btn.textContent === e.key)
        if (game.phrase.includes(matchingBtn.textContent)) {
            matchingBtn.classList.add("chosen")
            game.activePhrase.showMatchedLetter(matchingBtn);
            game.checkForWin();           
        } else {
            matchingBtn.classList.add("wrong");
            game.removeLife();
        }
        game.gameOver();
    }
}