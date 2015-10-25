const GetRandomColor = require('./shared/bubble-colors');
const DrawBubble     = require('./shared/draw-bubbles');

function Bubble(x, y, r, velocity, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = 2 * Math.PI
  // this.iRadius = 0.2;
  // this.oRadius = 10;
  this.canvas  = canvas;
  this.context = context;
  this.velocity = velocity;
  // this.color   = GetRandomColor(this, context);
  this.color = 'magenta';
}

Bubble.prototype = {
  draw: function() {
    DrawBubble(this);
    return this;
  },

  checkInBounds: function() {
    return this.x > 10 && this.x < 440 ? true : false;
  },

  moveLeft: function() {
    if (this.checkInBounds()) {
      this.x = this.x - 5
    } else if (!this.checkInBounds() && this.x === 440) {
      this.x = this.x - 5
    }
    return this;
  },

  moveRight: function() {
    if (this.checkInBounds()) {
      this.x = this.x + 5
    } else if (!this.checkInBounds() && this.x === 10) {
      this.x = this.x + 5
    }
    return this;
  },

  travel: function() {
    if (this.velocity > 0) {
      var coords = this.nextMove();
      this.x = coords.x;
      this.y = coords.y;
    }
    return this;
  },

  nextMove: function() {
    return {x: this.x, y: (this.y - this.velocity)};
  }
};

module.exports = Bubble;
