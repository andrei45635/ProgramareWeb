const cards = document.querySelectorAll('.card');

let flippedCard = false;
let first, second;
let lockBoard = false; //locking the board so only 2 cards can be flipped at once
let matchCounter = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === first) return; //checks to see if the player clicked on the same card twice

    this.classList.add('flip');
    if (!flippedCard) {
        flippedCard = true;
        first = this;
        return;
    }
    second = this;
    checkForMatch();
}

function checkForMatch() {
    if (first.dataset.prof === second.dataset.prof) {
        //disabling the cards, so we can't click on them again
        first.removeEventListener('click', flipCard);
        second.removeEventListener('click', flipCard);
        matchCounter++;
        resetBoard();
        if (matchCounter >= 6) setTimeout(() => window.alert("Congrats, you won! Refresh the page to keep playing!"), 1000);
        return;
    }

    lockBoard = true;
    //unflipping the cards if the match is incorrect
    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [first, second] = [null, null];
}

(function shuffle() {
    cards.forEach(card => card.style.order = Math.floor(Math.random() * 12).toString())
})();

cards.forEach(card => card.addEventListener('click', flipCard));