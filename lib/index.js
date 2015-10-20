var canvas  = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

function Bubble(x, y, r, eAngle, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = eAngle;
  this.canvas  = canvas;
  this.context = context;
}

var bubbles = [];
for (var i = 225; i < 350; i += 25) {
  bubbles.push (new Bubble(225, i, 10, 2 * Math.PI, canvas, context));
}
for (var i = 250; i < 350; i += 25) {
  bubbles.push (new Bubble(250, i, 10, 2 * Math.PI, canvas, context));
}
for (var i = 275; i < 350; i += 25) {
  bubbles.push (new Bubble(275, i, 10, 2 * Math.PI, canvas, context));
}

Bubble.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);

  this.context.fillStyle = "magenta";
  this.context.fill();

  return this;
};

Bubble.prototype.drop = function() {
  this.y = this.y + 2;
  return this;
};

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(function(bubble) {
    bubble.draw();
    dropBubble(bubble);
  });
  requestAnimationFrame(gameLoop);
});


function dropBubble(bubble) {
  canvas.addEventListener('click', function() {
    bubble.drop();
  });
}
