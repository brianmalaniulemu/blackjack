document.addEventListener('DOMContentLoaded', () => {
  // Card ranks & suits
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  const basicStrategy = {
    hard: {
      5:  { '2': 'Hit', '3': 'Hit', '4': 'Hit', '5': 'Hit', '6': 'Hit', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      6:  { '2': 'Hit', '3': 'Hit', '4': 'Hit', '5': 'Hit', '6': 'Hit', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      7:  { '2': 'Hit', '3': 'Hit', '4': 'Hit', '5': 'Hit', '6': 'Hit', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      8:  { '2': 'Hit', '3': 'Hit', '4': 'Hit', '5': 'Hit', '6': 'Hit', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      9:  { '2': 'Hit', '3': 'Double', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      10: { '2': 'Double', '3': 'Double', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Double', '8': 'Double', '9': 'Double', '10': 'Hit', 'A': 'Hit' },
      11: { '2': 'Double', '3': 'Double', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Double', '8': 'Double', '9': 'Double', '10': 'Double', 'A': 'Hit' },
      12: { '2': 'Hit', '3': 'Hit', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      13: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      14: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      15: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Surrender/Hit', 'A': 'Hit' },
      16: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Hit', '8': 'Hit', '9': 'Surrender/Hit', '10': 'Surrender/Hit', 'A': 'Surrender/Hit' },
      17: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
      18: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
      19: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
      20: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
      21: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
    },
    soft: {
      13: { '2': 'Hit', '3': 'Hit', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      14: { '2': 'Hit', '3': 'Hit', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      15: { '2': 'Hit', '3': 'Hit', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      16: { '2': 'Hit', '3': 'Hit', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      17: { '2': 'Hit', '3': 'Double', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      18: { '2': 'Stand', '3': 'Double', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Stand', '8': 'Stand', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      19: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Double', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
      20: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
      21: { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
    },
    pairs: {
      'A':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Split', '8': 'Split', '9': 'Split', '10': 'Split', 'A': 'Split' },
      '2':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Split', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      '3':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Split', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      '4':  { '2': 'Hit', '3': 'Hit', '4': 'Hit', '5': 'Split', '6': 'Split', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      '5':  { '2': 'Double', '3': 'Double', '4': 'Double', '5': 'Double', '6': 'Double', '7': 'Double', '8': 'Double', '9': 'Double', '10': 'Hit', 'A': 'Hit' },
      '6':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Hit', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      '7':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Split', '8': 'Hit', '9': 'Hit', '10': 'Hit', 'A': 'Hit' },
      '8':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Split', '8': 'Split', '9': 'Split', '10': 'Split', 'A': 'Split' },
      '9':  { '2': 'Split', '3': 'Split', '4': 'Split', '5': 'Split', '6': 'Split', '7': 'Stand', '8': 'Split', '9': 'Split', '10': 'Stand', 'A': 'Stand' },
      '10': { '2': 'Stand', '3': 'Stand', '4': 'Stand', '5': 'Stand', '6': 'Stand', '7': 'Stand', '8': 'Stand', '9': 'Stand', '10': 'Stand', 'A': 'Stand' },
    },
  };


  // Selector indices
  let dealerIndex = Math.floor(Math.random() * ranks.length);
  let playerIndex = Math.floor(Math.random() * ranks.length);

  // State
  let playerCards = [];

  // DOM references
  const dealerCard = document.getElementById('dealer-card');
  const playerCard = document.getElementById('player-card');
  const prevDealerBtn = document.getElementById('prev-dealer-btn');
  const nextDealerBtn = document.getElementById('next-dealer-btn');
  const prevPlayerBtn = document.getElementById('prev-player-btn');
  const nextPlayerBtn = document.getElementById('next-player-btn');
  const setDealerBtn = document.getElementById('set-dealer-btn');
  const addCardBtn = document.getElementById('add-card-btn');
  const findMoveBtn = document.getElementById('find-move-btn');
  const bestMoveModal = document.getElementById('best-move-modal');
  const bestMoveMessage = document.getElementById('best-move-message');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const resetBtn = document.getElementById('reset-btn');
  let playerHand = document.getElementById('player-cards');

  if (!playerHand) {
    playerHand = document.createElement('div');
    playerHand.id = 'player-cards';
    playerHand.className = 'hand';
    document.querySelector('#player-card')
            .parentNode
            .insertAdjacentElement('afterend', playerHand);
  }

  // Helper functions
  function getSuitSymbol(suit) {
    return { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' }[suit] || '?';
  }

  function randomSuit() {
    return suits[Math.floor(Math.random() * suits.length)];
  }

  function createCard(rank, suit) {
    const card = document.createElement('div');
    card.className = 'card';
    const front = document.createElement('div');
    front.className = 'card-front';
    front.innerHTML = `<div class="card-rank">${rank}</div><div class="card-suit">${getSuitSymbol(suit)}</div>`;
    const back = document.createElement('div');
    back.className = 'card-back';
    back.textContent = '🂠';
    card.append(front, back);
    return card;
  }

  function updateDealerFrame() {
    dealerCard.innerHTML = '';
    dealerCard.appendChild(createCard(ranks[dealerIndex], randomSuit()));
  }

  function updatePlayerFrame() {
    playerCard.innerHTML = '';
    playerCard.appendChild(createCard(ranks[playerIndex], randomSuit()));
  }

  function resetGame() {
    playerCards = [];
    playerHand.innerHTML = '';
    updateDealerFrame();
    updatePlayerFrame();
  }

  function calculateHandValue(cards) {
    let total = 0;
    let aces = 0;
    for (const card of cards) {
      if (card === 'A') {
        total += 11;
        aces += 1;
      } else if (['K', 'Q', 'J'].includes(card)) {
        total += 10;
      } else {
        total += parseInt(card, 10);
      }
    }
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  }

  function isSoftHand(cards) {
    if (!cards.includes('A')) return false;
    const hardTotal = calculateHandValue(cards.map(c => c === 'A' ? '1' : c));
    return hardTotal + 10 <= 21;
  }

  function getRecommendedMove(playerTotal, dealerUpcard, handType) {
    // Normalize inputs
    const normalizedHandType = handType.toLowerCase();
    const normalizedDealerUpcard = dealerUpcard.toString().toUpperCase();
  
    // Check if handType exists
    if (!basicStrategy[normalizedHandType]) {
      console.error(`Invalid handType: ${handType}`);
      return null;
    }
  
    // Get the player's strategy table for the hand type
    const playerStrategy = basicStrategy[normalizedHandType][playerTotal];
  
    // Check if player's total exists in the table
    if (!playerStrategy) {
      console.error(`No strategy found for player total: ${playerTotal} in hand type: ${handType}`);
      return null;
    }
  
    // Get the recommended move for dealer's upcard
    const move = playerStrategy[normalizedDealerUpcard];
  
    if (!move) {
      console.error(`No move found for dealer upcard: ${dealerUpcard} at player total: ${playerTotal}`);
      return null;
    }
  
    return move;
  }
  

  function getBestMove() {
    const dealerUpcard = ranks[dealerIndex];
    if (playerCards.length === 0) return 'Add some cards first!';

    const total = calculateHandValue(playerCards);
    const soft = isSoftHand(playerCards);
    const pair = playerCards.length === 2 && playerCards[0] === playerCards[1];

    if (pair && basicStrategy.pairs[playerCards[0]]?.[dealerUpcard]) {
      return basicStrategy.pairs[playerCards[0]][dealerUpcard];
    }
    if (soft && basicStrategy.soft[total]?.[dealerUpcard]) {
      return basicStrategy.soft[total][dealerUpcard];
    }
    if (basicStrategy.hard[total]?.[dealerUpcard]) {
      return basicStrategy.hard[total][dealerUpcard];
    }
    return 'No clear strategy found';
  }

  // Button handlers
  prevDealerBtn.addEventListener('click', () => {
    dealerIndex = (dealerIndex - 1 + ranks.length) % ranks.length;
    updateDealerFrame();
  });

  nextDealerBtn.addEventListener('click', () => {
    dealerIndex = (dealerIndex + 1) % ranks.length;
    updateDealerFrame();
  });

  setDealerBtn.addEventListener('click', () => {
    alert(`Dealer set to ${ranks[dealerIndex]} of ${randomSuit()}`);
  });

  prevPlayerBtn.addEventListener('click', () => {
    playerIndex = (playerIndex - 1 + ranks.length) % ranks.length;
    updatePlayerFrame();
  });

  nextPlayerBtn.addEventListener('click', () => {
    playerIndex = (playerIndex + 1) % ranks.length;
    updatePlayerFrame();
  });

  addCardBtn.addEventListener('click', () => {
    const selectedRank = ranks[playerIndex];
    playerCards.push(selectedRank);
    const card = createCard(selectedRank, randomSuit());
    playerHand.appendChild(card);

    playerIndex = Math.floor(Math.random() * ranks.length);
    updatePlayerFrame();
  });

  findMoveBtn.addEventListener('click', () => {
    const move = getBestMove();
    bestMoveMessage.textContent = `Best move: ${move}`;
    bestMoveModal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    bestMoveModal.style.display = 'none';
  });

  resetBtn.addEventListener('click', resetGame);

  // Initialize frames
  updateDealerFrame();
  updatePlayerFrame();
});
