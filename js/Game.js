class Game {
    constructor() {
        this.missed = 0;
        this.activePhrase = null;
        this.phrases = [new Phrase("cheese"), 
                        new Phrase("hot dog"), 
                        new Phrase("eggs"), 
                        new Phrase("sandwich"), 
                        new Phrase("beans")];
    };
    
    startGame() {
        overlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };
    
    getRandomPhrase() {
        let randomNum = Math.floor(Math.random() * (4 + 1));
        return this.phrases[randomNum];
    };

    handleInteraction(button) {
        button.disabled = true;
        if (!this.phrase.includes(button.textContent)) {
            button.classList.add("wrong");
            this.removeLife();
        } else {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(button);
            this.checkForWin();
        }
        this.gameOver();
    };


    removeLife() {
        const lives = document.querySelectorAll(".tries img");
        if (this.missed < 5) {
            lives[this.missed].setAttribute("src", "images/lostHeart.png")
            this.missed++;
        }
    };

    checkForWin() {
        const letters = document.querySelectorAll(".letter");
        const lettersAsArray = [...letters]

        return lettersAsArray.every(letter => {
            return letter.classList.contains("show")
        })
    };

    gameOver() {
        if (this.missed === 5) {
            for (let button of document.querySelectorAll("#qwerty button")) {
                button.disabled = true
            }
            overlay.style.display = "flex";
            overlay.setAttribute("class", "lose");
            overlay.querySelector("#game-over-message").textContent = "Sorry, try again next time!";
            startGameBtn.textContent = "Play Again!";
            this.reset();
            alreadyPressed = [];
            
        } else if (this.checkForWin() === true) {
            for (let button of document.querySelectorAll("#qwerty button")) {
                button.disabled = true
            }
            overlay.style.display = "flex";
            overlay.setAttribute("class", "win");
            overlay.querySelector("#game-over-message").textContent = `Congrats, you guessed the word! - "${game.phrase}"`;
            startGameBtn.textContent = "Play Again!";
            this.reset();
            alreadyPressed = []; 
            
        }
    };

    reset() {
        for (let li of [...document.querySelector("#phrase ul").children]) {
            li.remove()
        };
        for (let button of document.querySelectorAll("#qwerty button")) {
            button.disabled = false;
            button.classList.remove('wrong')
            button.classList.remove('chosen')
        };
        for (let life of document.querySelectorAll(".tries img")) {
            life.setAttribute('src', 'images/liveHeart.png')
        };
        this.missed = 0;
    }


    get phrase() {
        return this.activePhrase.phrase;
    };
}