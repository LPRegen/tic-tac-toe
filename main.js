'use strict';
const playerFactory = function (name, symbol) {
  return {
    name,
    symbol,
  };
};

const player1 = new playerFactory('Player 1', 'X');
const player2 = new playerFactory('Player 2', 'O');

const Gameboard = (function () {
  let _boardArr = new Array(9).fill('');
  let _cells = Array.from(document.querySelectorAll('.cell'));
  let _turnCount = 1;
  let _winner = undefined;

  // Restart variables related to functionality and cell elements.
  function _restartGame() {
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', function () {
      _boardArr.fill('');
      _turnCount = 1;
      _winner = undefined;
      _cells.forEach((cell) => {
        cell.textContent = '';
      });
    });
  }

  // Depending on _turnCount, return player.symbol
  function _checkTurn() {
    if (_turnCount % 2 === 1) {
      _turnCount++;
      return player1.symbol;
    } else {
      _turnCount++;
      return player2.symbol;
    }
  }

  // Check if there is a winner, add symbol to board and
  // add corresponding element to _boardArr
  function _addSymbol() {
    _cells.forEach((cell) => {
      cell.addEventListener('click', function (e) {
        _checkWinner();
        if (!_winner) {
          if (cell.textContent === '' && _turnCount < 10) {
            let cellIdx = +e.target.dataset.cell;
            cell.textContent = _checkTurn();
            _boardArr.splice(cellIdx, 1, cell.textContent);
          }
        }
      });
    });
  }

  // Start to check after _turnCount > 5, check for winning conditions
  // and return winner.
  function _checkWinner() {
    if (_turnCount > 5) {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i <= 7; i++) {
        let winCondition = winningConditions[i];
        let optA = _boardArr[winCondition[0]];
        let optB = _boardArr[winCondition[1]];
        let optC = _boardArr[winCondition[2]];
        if (optA + optB + optC === 'XXX') {
          _winner = player1.name;
        }
        if (optA + optB + optC === 'OOO') {
          _winner = player2.name;
        }
      }
    }
  }

  _restartGame();
  _addSymbol();
})();
