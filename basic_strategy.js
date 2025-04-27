function getBestMove(playerHand, dealerCard, canDouble = true, canSurrender = false, canSplit = true) {
  const { total, isSoft } = calculateTotal(playerHand);
  const dealerValue = getCardValue(dealerCard);
  const isPair = playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank;

  // ========================
  // 1. Surrender Check (Priority 1)
  // ========================
  /* Basic Strategy surrender rules:
     - Surrender 15 vs dealer 10 (except pairs)
     - Surrender 16 vs dealer 9-A (except pairs) */
  if (canSurrender && playerHand.length === 2) {
      if ((total === 15 && dealerValue === 10) || 
          (total === 16 && dealerValue >= 9 && !isPair)) {
          return 'Surrender';
      }
  }

  // ========================
  // 2. Pair Splitting (Priority 2)
  // ========================
  if (isPair && canSplit) {
      const pairValue = getCardValue(playerHand[0]);
      switch(pairValue) {
          case 11: // Aces
              return 'Split';
          case 9:  // 9s: Split vs 2-6, 8-9; Stand vs 7,10,A
              return (dealerValue === 7 || dealerValue >= 10) ? 'Stand' : 'Split';
          case 8:  // Always split 8s
              return 'Split';
          case 7:  // 7s: Split vs 2-7
              return dealerValue <= 7 ? 'Split' : 'Hit';
          case 6:  // 6s: Split vs 2-6
              return dealerValue <= 6 ? 'Split' : 'Hit';
          case 5:  // 5s: Never split, double vs 2-9
              return dealerValue <= 9 ? 'Double' : 'Hit';
          case 4:  // 4s: Only split vs 5-6 in single deck
              return dealerValue >= 5 && dealerValue <= 6 ? 'Split' : 'Hit';
          case 2: case 3: // 2s/3s: Split vs 4-7
              return dealerValue <= 7 ? 'Split' : 'Hit';
          case 10: // Never split 10s
              return 'Stand';
      }
  }

  // ========================
  // 3. Soft Total Handling (Ace counted as 11)
  // ========================
  if (isSoft) {
      // Special case: Soft 18 (A7) vs dealer 9-A
      if (total === 18) {
          if (dealerValue >= 9) return 'Hit';
          if (dealerValue === 7 || dealerValue === 8) return 'Stand';
          return canDouble ? 'Double' : 'Hit';
      }
      
      // General soft total rules
      const softHandRules = {
          19: 'Stand',
          20: 'Stand',
          17: dealerValue >= 3 && dealerValue <= 6 ? 'Double' : 'Hit',
          16: dealerValue >= 4 && dealerValue <= 6 ? 'Double' : 'Hit',
          15: dealerValue >= 4 && dealerValue <= 6 ? 'Double' : 'Hit',
          14: dealerValue >= 5 && dealerValue <= 6 ? 'Double' : 'Hit',
          13: dealerValue >= 5 && dealerValue <= 6 ? 'Double' : 'Hit'
      };
      return softHandRules[total] || 'Hit';
  }

  // ========================
  // 4. Hard Total Handling (No aces or aces counted as 1)
  // ========================
  // Special case: Hard 11 (always double if possible)
  if (total === 11) return canDouble ? 'Double' : 'Hit';

  // Other hard totals
  const hardHandRules = {
      21: 'Stand',
      20: 'Stand',
      19: 'Stand',
      18: 'Stand',
      17: 'Stand',
      16: dealerValue >= 7 ? 'Hit' : 'Stand',
      15: dealerValue >= 7 ? 'Hit' : 'Stand',
      14: dealerValue <= 6 ? 'Stand' : 'Hit',
      13: dealerValue <= 6 ? 'Stand' : 'Hit',
      12: dealerValue >= 4 && dealerValue <= 6 ? 'Stand' : 'Hit',
      10: (dealerValue <= 9 && canDouble) ? 'Double' : 'Hit',
      9: (dealerValue >= 3 && dealerValue <= 6 && canDouble) ? 'Double' : 'Hit'
  };
  
  return hardHandRules[total] || 'Hit';
}

// ========================
// Helper Functions
// ========================
function getCardValue(card) {
  // Returns numeric value with Ace = 11
  const rank = card.rank;
  if (['K', 'Q', 'J'].includes(rank)) return 10;
  return rank === 'A' ? 11 : parseInt(rank);
}

function calculateTotal(hand) {
  // Returns {total: number, isSoft: boolean}
  // isSoft = true if hand contains usable Ace (counted as 11)
  let total = 0;
  let aces = 0;
  
  // First pass: Count all cards with Aces as 11
  for (const card of hand) {
      const value = getCardValue(card);
      total += value;
      if (value === 11) aces++;
  }
  
  // Convert Aces to 1 as needed
  while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
  }
  
  return {
      total: total,
      isSoft: aces > 0 && total <= 21
  };
}


// ========================
// Test Cases
// ========================

function runTests() {
  // Test 1: Split Aces (should always split)
  const test1 = {
      playerHand: [{rank: 'A'}, {rank: 'A'}],
      dealerCard: {rank: '5'},
      expected: 'Split'
  };
  console.log('Test 1:', getBestMove(test1.playerHand, test1.dealerCard) === test1.expected ? 'PASS' : 'FAIL');

  // Test 2: Soft 18 vs Dealer 9 (should hit)
  const test2 = {
      playerHand: [{rank: 'A'}, {rank: '7'}],
      dealerCard: {rank: '9'},
      expected: 'Hit'
  };
  console.log('Test 2:', getBestMove(test2.playerHand, test2.dealerCard) === test2.expected ? 'PASS' : 'FAIL');

  // Test 3: Surrender 16 vs Dealer 9 (with surrender allowed)
  const test3 = {
      playerHand: [{rank: '8'}, {rank: '8'}],
      dealerCard: {rank: '9'},
      expected: 'Surrender'
  };
  console.log('Test 3:', getBestMove(test3.playerHand, test3.dealerCard, true, true) === test3.expected ? 'PASS' : 'FAIL');

  // Test 4: Double 5s vs Dealer 4
  const test4 = {
      playerHand: [{rank: '5'}, {rank: '5'}],
      dealerCard: {rank: '4'},
      expected: 'Double'
  };
  console.log('Test 4:', getBestMove(test4.playerHand, test4.dealerCard) === test4.expected ? 'PASS' : 'FAIL');

  // Test 5: Hard 12 vs Dealer 3 (should hit)
  const test5 = {
      playerHand: [{rank: '7'}, {rank: '5'}],
      dealerCard: {rank: '3'},
      expected: 'Hit'
  };
  console.log('Test 5:', getBestMove(test5.playerHand, test5.dealerCard) === test5.expected ? 'PASS' : 'FAIL');
}

// ========================
// Helper Function for Card Creation
// ========================
function createCard(rank, suit = '') {
  return { rank: rank.toString(), suit };
}

// ========================
// Run Tests
// ========================
runTests();