const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    refreshBtn = document.querySelector(".details button"),
    popup = document.getElementById("popupMessage"),
    popupText = document.getElementById("popupText");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        showPopupMessage("💀 Game Over! Time's up.");
        return;
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }

    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");

        if (!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;

        const icon1 = cardOne.querySelector(".back-view i").classList.value;
        const icon2 = cardTwo.querySelector(".back-view i").classList.value;

        matchCards(icon1, icon2);
    }
}

function matchCards(icon1, icon2) {
    if (icon1 === icon2) {
        matchedCards++;
        if (matchedCards === 6 && timeLeft > 0) {
            clearInterval(timer);
            showPopupMessage("🏆 You win! Well played.");
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCards() {
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    hidePopupMessage(); 
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    const arr = [
        "bxl-tiktok", "bxl-instagram-alt", "bxl-facebook-circle",
        "bxl-twitter", "bxl-whatsapp", "bxl-youtube",
        "bxl-tiktok", "bxl-instagram-alt", "bxl-facebook-circle",
        "bxl-twitter", "bxl-whatsapp", "bxl-youtube"
    ];

    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip", "shake");
        const iconTag = card.querySelector(".back-view i");
        setTimeout(() => {
            iconTag.classList.value = `bx ${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

function showPopupMessage(message) {
    popupText.innerText = message;
    popup.classList.add("show");
}

function hidePopupMessage() {
    popup.classList.remove("show");
}

refreshBtn.addEventListener("click", shuffleCards);
cards.forEach(card => card.addEventListener("click", flipCard));

shuffleCards();
