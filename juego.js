const animals = [
    { name: 'speed', img: 'speed.jpg' },
    { name: 'dragon', img: 'dragon.jpg' },
    { name: 'mono', img: 'mono.jpg' },
    { name: 'cerdo', img: 'cerdo.jpg' },
    { name: 'tiburoncin', img: 'tiburoncin.jpg' }
];

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0; // Contador de parejas encontradas

function startGame() {
    matchedPairs = 0; // Reiniciar contador de parejas
    document.getElementById('gameBoard').style.display = 'grid';
    document.getElementById('winMessage').style.display = 'none'; // Ocultar mensaje de victoria
    createBoard();
}

function createBoard() {
    cards = [...animals, ...animals]; // Duplica los animales para crear pares
    cards.sort(() => 0.5 - Math.random()); // Mezclar cartas

    const board = document.getElementById('gameBoard');
    board.innerHTML = ''; // Limpiar el tablero

    cards.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front" style="background-image: url('${animal.img}')"></div>
                <div class="card-back">?</div>
            </div>`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-front').style.backgroundImage ===
                    secondCard.querySelector('.card-front').style.backgroundImage;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++; // Aumentar el contador de parejas encontradas
    resetBoard();

    // Si se han encontrado todas las parejas, mostrar mensaje de victoria
    if (matchedPairs === animals.length) {
        displayWinMessage();
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function displayWinMessage() {
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('winMessage').style.display = 'block';
}

// Inicializar el juego
startGame();
