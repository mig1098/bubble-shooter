const Bubble         = require('./bubble');
const GetRandomColor = require('./shared/bubble-colors');
const DrawBubble     = require('./shared/draw-bubbles');

function Shooter(x, y, r, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = 2 * Math.PI;
  this.iRadius = 0.2;
  this.oRadius = 10;
  this.canvas  = canvas;
  this.context = context;
  this.color   = GetRandomColor(this, context);
}

Shooter.prototype = {
  draw: function() {
    DrawBubble(this);
    return this;
  },

  checkInBounds: function() {
    return this.x > 10 && this.x < 440 ? true : false;
  },

  checkBackWall: function() {
    return this.y < 440 ? true : false;
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

  shoot: function() {
    // iterate through array of bubbles on the board
    // for each bubble, call checkForAdjacentBubbles method
    // if method returns true at any point, shooter stops
    this.checkBackWall() ? this.y = this.y + 1 : this;
    return this;
  }
}

module.exports = Shooter;
