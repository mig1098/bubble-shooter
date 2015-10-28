const GetRandomColor = require('./shared/bubble-colors');
const DrawBubble     = require('./shared/draw-bubbles');

function Bubble(x, y, r, velocity, canvas, context, board) {
  this.x        = x;
  this.y        = y;
  this.radius   = r;
  this.sAngle   = 0;
  this.eAngle   = 2 * Math.PI;
  this.canvas   = canvas;
  this.context  = context;
  this.velocity = velocity;
  this.board    = board;
  this.color    = GetRandomColor(this, context);
}

Bubble.prototype.draw = function() {
    DrawBubble(this);
    return this;
};

Bubble.prototype.checkInBounds = function() {
  return this.x > 15 && this.x < 433 ? true : false;
};

Bubble.prototype.moveLeft = function() {
  if (this.checkInBounds()) {
    this.x = this.x - 22
  } else if (!this.checkInBounds() && this.x === 433) {
    this.x = this.x - 22
  }
  console.log(this.x);
  return this;
};

Bubble.prototype.moveRight = function() {
  if (this.checkInBounds()) {
    this.x = this.x + 22
  } else if (!this.checkInBounds() && this.x === 15) {
    this.x = this.x + 22
  }
  console.log(this.x);
  return this;
};

Bubble.prototype.travel = function() {
  if (this.velocity > 0) {
    var coords = this.nextMove();
    this.x = coords.x;
    this.y = coords.y;
  }
  return this;
};

Bubble.prototype.nextMove = function() {
  return {x: this.x, y: (this.y - this.velocity)};
};

module.exports = Bubble;
