const Bubble = require('./bubble');
var canvas  = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

var bubbles = [];

for (var j = 0; j < 250; j += 23) {
  for (var i = 100; i < 350; i += 25) {
    bubbles.push (new Bubble(110 + j, i, 10, 2 * Math.PI, canvas, context));
  }
}

function drawBubbles() {
  bubbles.forEach(function(bubble) {
    bubble.draw();

    bindEvents(bubble);
  });
}

function bindEvents(bubble) {
  // i1 add logic so that a single bubble drops on click
      // i2 drop matching bubbles
  canvas.addEventListener('click', function() {
    bubble.drop();
  });
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBubbles();

  requestAnimationFrame(gameLoop);
});