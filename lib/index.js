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

var bubble = new Bubble(225, 225, 10, 2 * Math.PI, canvas, context);

Bubble.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);

    this.context.fillStyle = "magenta";
    this.context.fill();

    return this;
};

Bubble.prototype.drop = function() {
  // while (this.y < canvas.height) {
    this.y = this.y + 2;
    // return this;
  //   setTimeout(function() { this.y++; }, 1000);
  // }
  return this;
};

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  bubble.draw();
  dropBall();
  requestAnimationFrame(gameLoop);
});


function dropBall () {
  canvas.addEventListener('click', function() {
    bubble.drop();
  });
}

function bindClickEvents ()
