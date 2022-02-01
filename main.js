'use strict';

const playerFactory = function (name, symbol, CSSclass) {
  return {
    name,
    symbol,
    CSSclass,
  };
};

const player1 = new playerFactory('Player 1', 'X', 'player-x');
const player2 = new playerFactory('Player 2', 'O', 'player-o');

const DisplayController = (function () {
  let _cells = Array.from(document.querySelectorAll('.cell'));

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

  function toggleClassAndDataModal() {
    let modalBackground = document.querySelector('.modal-bg');
    modalBackground.dataset.displayed = 'true';
    if (!modalBackground.dataset.displayModal) {
      modalBackground.classList.toggle('modal-active');
    }

    return { modalBackground };
  }

  function displayModal(winner) {
    if (winner) {
      toggleClassAndDataModal();
    }
    if (
      winner === null &&
      !toggleClassAndDataModal().modalBackground.dataset.displayed
    ) {
      toggleClassAndDataModal();
    }
    if (winner === false) {
      toggleClassAndDataModal();
    }

    _updateDisplayedWinner(winner);
  }

  function _updateDisplayedWinner(winner) {
    let modalMessage = document.querySelector('#modal-message');
    if (winner) {
      modalMessage.textContent = `${winner} won the game!`;
    } else {
      modalMessage.textContent = "It's a draw!";
    }
  }

  function _closeModal() {
    let closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', function () {
      toggleClassAndDataModal();
    });
  }

  function clearCells() {
    _cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove(player1.CSSclass);
      cell.classList.remove(player2.CSSclass);
    });
    return _cells;
  }

  _reassignPlayerName();
  _closeModal();

  return {
    displayModal,
    clearCells,
  };
})();

const Gameboard = (function () {
  let _boardArr = new Array(9).fill('');
  let _turnCount = 1;
  let _winner = undefined;

  function _restartGame() {
    const restartBtn = Array.from(document.querySelectorAll('.restart'));

    restartBtn.forEach((restartBtn) => {
      restartBtn.addEventListener('click', function () {
        if (_winner && _winner === null) {
          DisplayController.displayModal(_winner);
        }
        DisplayController.clearCells();
        _boardArr.fill('');
        _turnCount = 1;
        _winner = undefined;
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
    DisplayController.clearCells().forEach((cell) => {
      cell.addEventListener('click', function (e) {
        if (!_winner) {
          if (cell.textContent === '' && _turnCount < 10) {
            let cellIdx = +e.target.dataset.cell;
            cell.textContent = _checkTurn();
            cell.textContent === 'X'
              ? cell.classList.add(player1.CSSclass)
              : cell.classList.add(player2.CSSclass);
            _boardArr.splice(cellIdx, 1, cell.textContent);
          }
        }

        _checkWinOrDraw();
      });
    });
  }

  function _checkWinOrDraw() {
    if (_turnCount > 5) {
      const winningPossibilities = [
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
        let winCondition = winningPossibilities[i];

        let firstPosition = _boardArr[winCondition[0]];
        let secondPosition = _boardArr[winCondition[1]];
        let thirdPosition = _boardArr[winCondition[2]];

        if (firstPosition + secondPosition + thirdPosition === 'XXX') {
          _winner = player1.name;
        }

        if (firstPosition + secondPosition + thirdPosition === 'OOO') {
          _winner = player2.name;
        }
      }
    }

    if (_turnCount === 10) {
      _winner = null;
    }

    return DisplayController.displayModal(_winner);
  }

  _restartGame();
  _addSymbol();
})();

//// Bug, when it's a draw or some player won the game
//// if the modal is closed,
// ! Add method to update player's turn.
// ! Create method to avoid doing DOM manipulation on Gameboard.
