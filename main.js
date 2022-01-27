'use strict';

const playerFactory = function (name, symbol) {
  return {
    name,
    symbol,
  };
};

const player1 = new playerFactory('Player 1', 'X');
const player2 = new playerFactory('Player 2', 'O');

const DisplayController = (function () {
  function _reassignPlayerName() {
    const submitNameBtns = document.querySelectorAll('.submit-name');

    submitNameBtns.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        let displayedPlayerName = e.target.parentElement.children[0];
        let inputFieldName = e.target.parentElement.children[1];

        if (inputFieldName.value !== '' && inputFieldName !== ' ') {
          displayedPlayerName.textContent === player1.name
            ? (player1.name = inputFieldName.value)
            : (player2.name = inputFieldName.value);

          displayedPlayerName.textContent = inputFieldName.value;
        }

        inputFieldName.value = '';
      });
    });
  }

  function _toggleClassOnModal() {
    let modalBackground = document.querySelector('.modal-bg');
    modalBackground.classList.toggle('modal-active');
  }

  function displayModal(winner) {
    if (winner) {
      _toggleClassOnModal();
    }
    if (winner === null) {
      _toggleClassOnModal();
    }
    if (winner === false) {
      _toggleClassOnModal();
    }

    _updateDisplayedWinner(winner);
  }

  function _updateDisplayedWinner(winner) {
    let modalMessage = document.querySelector('#modal-message');
    if (winner) {
      modalMessage.textContent = `${winner} won the game!`;
    } else {
      modalMessage.textContent = "It's a tie!";
    }
  }

  function _closeModal() {
    let closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', function (e) {
      _toggleClassOnModal();
    });
  }

  _reassignPlayerName();
  _closeModal();

  return {
    displayModal,
  };
})();

const Gameboard = (function () {
  let _boardArr = new Array(9).fill('');
  let _cells = Array.from(document.querySelectorAll('.cell'));
  let _turnCount = 1;
  let _winner = undefined;

  function _restartGame() {
    const restartBtn = Array.from(document.querySelectorAll('.restart'));

    restartBtn.forEach((restartBtn) => {
      restartBtn.addEventListener('click', function () {
        DisplayController.displayModal(_winner);
        _boardArr.fill('');
        _turnCount = 1;
        _winner = undefined;
        _cells.forEach((cell) => {
          cell.textContent = '';
        });
        // DisplayController.displayModal();
      });
    });
  }

  function _checkTurn() {
    if (_turnCount % 2 === 1) {
      _turnCount++;
      return player1.symbol;
    } else {
      _turnCount++;
      return player2.symbol;
    }
  }

  function _addSymbol() {
    _cells.forEach((cell) => {
      cell.addEventListener('click', function (e) {
        if (!_winner) {
          if (cell.textContent === '' && _turnCount < 10) {
            let cellIdx = +e.target.dataset.cell;
            cell.textContent = _checkTurn();
            _boardArr.splice(cellIdx, 1, cell.textContent);
          }
        }

        _checkWinOrTie();
      });
    });
  }

  function _checkWinOrTie() {
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
    if (_turnCount === 9) {
      _winner = null;
    }

    return DisplayController.displayModal(_winner);
  }

  _restartGame();
  _addSymbol();
})();
