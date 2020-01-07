class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        for (let letter of this.phrase) {
            let li = document.createElement("li");
            if (letter === " ") {
                li.setAttribute("class", "space")
            } else {
                li.textContent = letter
                li.setAttribute("class", `hide letter ${letter}`)
            }
            document.querySelector("#phrase ul").appendChild(li)
        }
    }

    showMatchedLetter(button) {
        const letters = document.querySelectorAll(".letter");
        for (let letter of letters) {
            if (letter.classList.contains(button.textContent)) {
                letter.classList.add("show")
            }
        }
    }
}

