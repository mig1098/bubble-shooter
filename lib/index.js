const Bubble  = require('./bubble');
const Board   = require('./board');
const Shooter = require('./shooter');
var canvas    = document.getElementById('gameCanvas');
var context   = canvas.getContext('2d');

var shooter = new Shooter(225, 440, 10, canvas, context)
var board   = new Board(450, 450);
var bubbles = [];

for (var j = 0; j < 225; j += 22) {
  for (var i = 11; i < 430; i += 22) {
    bubbles.push (new Bubble(i, 11 + j, 10, canvas, context));
  }
}

function drawBubbles () {
  bubbles.forEach(function(bubble) {
    bubble.draw();
  });
}

function drawShooter () {
  shooter.draw();
}

function onKeyUp (e) {
  console.log(e.keycode);
  if (e.keyCode === 107) {
    board.shooterWasPressed(shooter);
  } else if (e.keyCode === 104) {
    board.moveLeft(shooter);
  } else if (e.keyCode === 108) {
    board.moveRight(shooter);
  }
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('keypress', onKeyUp, false);

  drawBubbles();
  drawShooter();

  requestAnimationFrame(gameLoop);
});
