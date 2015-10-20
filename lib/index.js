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

Bubble.prototype = {
  draw: function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);

    this.context.fillStyle = "magenta";
    this.context.fill();

    return this;
  },

  drop: function() {
    this.y = this.y + 2;
    return this;
  }
};

var bubbles = [];

for (var j = 0; j < 280; j += 23) {
  for (var i = 100; i < 380; i += 25) {
    bubbles.push (new Bubble(90 + j, i, 10, 2 * Math.PI, canvas, context));
  }
}

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
