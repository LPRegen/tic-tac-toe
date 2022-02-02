# Tic Tac Toe

## Introduction

- This [project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/tic-tac-toe) is part of [The Odin Project's curriculum](https://www.theodinproject.com/paths/full-stack-javascript).
- Read it also in [Spanish]() **add link to translation**

## Objective

- Have as little global code as possible.
- Internalize module design pattern.
  - Use modules.
  - Use private and public functions/methods.
- Take advantage of scope and closures.

## Walkthrough

The bigger challenge I faced with this project, was to start to think in an object oriented way (at the beginning it did not had too much sense)

Inside the `GameBoard` module I initialized the private method `_boardArray` which has an array assigned with nine empty strings. Ater that I created the private method `_addSymbol` which only added an "X" or an "O" (hard coded) to the gameboard via DOM manipulation.
When I had to find a way to add the current player's symbol, I realized that a factory function for players was needed and I created `playerFactory`. But then I struggled to find a way to identify which player is turn and I end up adding `_turnCount`'s private variable (it has a number 1 assigned) and `_checkTurn`'s private method, which checks if the value of `_turnCount` is odd or even and each time is called will increase `_turnCount`, and based on the result it will return the corresponding player.
After being able to add the corresponding player's symbols (strings), I created `_restartGame`, but **here** is where I faced the necesity to use another module. I was starting to have all the functionality of the game and DOM manipulation in the same module, all together like a big plate of spaghetti so I created the `DisplayController` module.

To check who won the game I have created `_checkWinOrDraw`, after a player play its turn the method is called. This has an array with **depth of one** with the `winningPossibilities`, and inside a `for...loop` the array at position `[i]` will be assigned to the `winCondition` variable. `winCondition` contains an array. So with that array at position `[0, 1, 2]` I can compare if the result of `_boardArray` at `winCondition[0]` contains an `X` or an `O`, and finally if I concatenate the three possible options and as result I get `"XXX` or `"OOO"` I can return the winning player stored into `_winner` (which originally has `undefined` assigned).
Also if `_turnCount`has a value of `9` is a draw, and `_winner` will be returned with `null`.

## Technologies

- HTML
- CSS
- Javascript
