'use strict';
// Player factory.
const playerFactory = function (name, symbol) {
  return {
    name,
    symbol,
  };
};

// Create players.
const player1 = new playerFactory('Player 1', 'X', true);
const player2 = new playerFactory('Player 2', 'O', false);
