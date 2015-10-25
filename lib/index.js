const Bubble  = require('./bubble');
const Board   = require('./board');
var canvas    = document.getElementById('gameCanvas');
var context   = canvas.getContext('2d');

var board   = new Board(450, 450, canvas, context);

function renderBoard() {
  board.render();
}

function onKeyUp (e) {
  console.log(e.keycode);
  if (e.keyCode === 107) {
    board.shooterWasPressed();
  } else if (e.keyCode === 104) {
    board.moveLeft();
  } else if (e.keyCode === 108) {
    board.moveRight();
  }
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('keypress', onKeyUp, false);
  renderBoard();
  requestAnimationFrame(gameLoop);
});
