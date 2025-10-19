const gameBoard = document.getElementById('gameBoard');

// الألوان (6 أزواج = 12 كارت)
let colors = ["red", "blue", "green", "yellow", "purple", "brown"];
colors = [...colors, ...colors]; // عمل نسختين للأزواج

// خلط الكروت
colors.sort(() => Math.random() - 0.5);

let flippedCards = [];
let matchedCards = 0;

// إنشاء الكروت
colors.forEach(color => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-color', color);
    card.addEventListener('click', flipCard);
    card.textContent = color; // بتظهر لما تتقلب
    gameBoard.appendChild(card);
});

function flipCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === colors.length) {
            setTimeout(() => alert("مبروك! خلصت اللعبة 🎉"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 800);
    }
    flippedCards = [];
}
