const Bubble  = require('./bubble');
const Board   = require('./board');
const Shooter = require('./shooter');
var canvas    = document.getElementById('gameCanvas');
var context   = canvas.getContext('2d');

var shooter = new Shooter(225, 10, 10, 2 * Math.PI, canvas, context)
var board   = new Board(450, 450);
var bubbles = [];

for (var j = 0; j < 250; j += 23) {
  for (var i = 100; i < 350; i += 25) {
    bubbles.push (new Bubble(110 + j, i, 10, 2 * Math.PI, canvas, context));
  }
}

function drawBubbles() {
  bubbles.forEach(function(bubble) {
    bubble.draw();
  });
}

function onKeyUp(e) {
  if (e.keyCode === 32) {
    board.spaceBarWasPressed(shooter);
  }
}

function rotate(context) {
  context.translate(225, 225);
  context.rotate(Math.PI / 180 * 0.5);
  context.translate(-225, -225);
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('keypress', onKeyUp, false);

  rotate(context);
  drawBubbles();

  requestAnimationFrame(gameLoop);
});
