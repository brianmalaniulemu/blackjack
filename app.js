const dealerHandDiv = document.getElementById('dealer-hand');
const playerCardsDiv = document.getElementById('player-cards');
const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');
const currentRankDiv = document.getElementById('current-rank');
const addCardBtn = document.getElementById('add-card-btn');
const findMoveBtn = document.getElementById('find-move-btn');
const resetBtn = document.getElementById('reset-btn');
const bestMoveDiv = document.getElementById('best-move');
const setDealerBtn = document.getElementById('set-dealer-btn');




const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let selectedSuit = 'hearts';
let selectedRankIndex = 0;

let dealerHand = null;
let playerHand = [];

document.querySelectorAll('.suit').forEach(suitDiv => {
  suitDiv.addEventListener('click', () => {
    selectedSuit = suitDiv.dataset.suit;
  });
});

upBtn.addEventListener('click', () => {
  selectedRankIndex = (selectedRankIndex + 1) % ranks.length;
  currentRankDiv.textContent = ranks[selectedRankIndex];
});

downBtn.addEventListener('click', () => {
  selectedRankIndex = (selectedRankIndex - 1 + ranks.length) % ranks.length;
  currentRankDiv.textContent = ranks[selectedRankIndex];
});

addCardBtn.addEventListener('click', () => {
  const rank = ranks[selectedRankIndex];
  const card = { suit: selectedSuit, rank };
  addPlayerCard(card);
});

findMoveBtn.addEventListener('click', () => {
  if (!dealerHand || playerHand.length === 0) {
    alert('Please select dealer and player cards!');
    return;
  }
  const move = getBestMove(playerHand, dealerHand);
  bestMoveDiv.textContent = move;
});

resetBtn.addEventListener('click', () => {
  dealerHand = null;
  playerHand = [];
  dealerHandDiv.innerHTML = '';
  playerCardsDiv.innerHTML = '';
  bestMoveDiv.textContent = 'Best move will appear here';
});

function addDealerCard(card) {
  dealerHand = card;
  dealerHandDiv.innerHTML = '';
  const img = createCardImage(card);
  dealerHandDiv.appendChild(img);
}

function addPlayerCard(card) {
  playerHand.push(card);
  const img = createCardImage(card);
  playerCardsDiv.appendChild(img);
}

function createCardImage(card) {
  const rankMap = {
    'J': 'jack',
    'Q': 'queen',
    'K': 'king',
    'A': 'a',
  };

  const rankName = rankMap[card.rank] || card.rank; 

    const img = document.createElement('img');
    img.src = `assets/cards/${rankName}_of_${card.suit}.png`;
    img.alt = `${card.rank} of ${card.suit}`;
    img.classList.add('card-image'); // Optional: add some class for styling
    return img;
  }
  

// Click on dealer area to set dealer card first
dealerHandDiv.addEventListener('click', () => {
  const rank = ranks[selectedRankIndex];
  const card = { suit: selectedSuit, rank };
  addDealerCard(card);
});


setDealerBtn.addEventListener('click', () => {
    const rank = ranks[selectedRankIndex];
    const card = { suit: selectedSuit, rank };
    addDealerCard(card);
  });
  