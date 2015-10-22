const Bubble  = require('./bubble');
const Board   = require('./board');
const Shooter = require('./shooter');
var canvas    = document.getElementById('gameCanvas');
var context   = canvas.getContext('2d');

var shooter = new Shooter(225, 10, 10, 2 * Math.PI, canvas, context)
var board   = new Board(450, 450);
var bubbles = [];

for (var j = 0; j < 200; j += 22) {
  for (var i = 11; i < 430; i += 22) {
    bubbles.push (new Bubble(i, 11 + j, 10, 2 * Math.PI, canvas, context));
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

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('keypress', onKeyUp, false);
  drawBubbles();

  requestAnimationFrame(gameLoop);
});
