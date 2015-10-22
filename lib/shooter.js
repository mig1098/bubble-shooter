const Bubble = require('./bubble');

function Shooter(x, y, r, eAngle, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = eAngle;
  this.canvas  = canvas;
  this.context = context;
}

Shooter.prototype = {
  checkLeftAndRightBounds: function() {
    return this.x > 10 && this.x < 440 ? true : false;
  },

  checkBackWall: function () {
    return this.y < 440 ? true : false;
  },

  // checkForAdjacentBubbles: function () {
  //   this.x === bubble.x - 11 || this.x === bubble.x + 11 || this.y === bubble.y - 11 ? true : false;
  // },

  moveLeft: function () {
    this.checkLeftAndRightBounds() ? this.x = this.x - 5 : this;
    return this;
  },

  moveRight: function () {
    this.checkLeftAndRightBounds() ? this.x = this.x + 5 : this;
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
