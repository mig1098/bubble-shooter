const Bubble = require('./bubble');
const Board  = require('./board');
const $      = require('jquery');
const Miley  = require('./shared/miley');
let canvas   = document.getElementById('gameCanvas');
let context  = canvas.getContext('2d');
let board    = new Board(450, 450, canvas, context);

function renderBoard() {
  board.render();
}

function renderFiveTries() {
  for (var i = 0; i < 5; i++) {
    $('#tries').append(Miley);
  }
}

function removeOneTry() {
  var counter = Board.counter.value();

  if (counter === 4){
    $('iframe').removeClass('hidden');
  } else {
    $('iframe:nth-child(' + (counter + 1) + ')').last().addClass('hidden');
  }
}

function onKeyUp (e) {
  if (e.keyCode === 107) {
    removeOneTry();
    board.shooterWasPressed();
  } else if (e.keyCode === 104) {
    board.moveLeft();
  } else if (e.keyCode === 108) {
    board.moveRight();
  }
}

function gameOver() {
  board.once('atBottom', function() {
    $('.gameover').toggleClass('hidden');
  });
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('keypress', onKeyUp, false);
  renderBoard();
  gameOver();

  requestAnimationFrame(gameLoop);
});

$(document).ready(function() {
  renderFiveTries();
});
