const Bubble = require('./bubble');

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
  this.color   = getRandomColor(this, context);
}

Shooter.prototype = {
  draw: function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);

    this.context.fillStyle = this.color;
    this.context.fill();

    return this;
  },

  checkInBounds: function() {
    return this.x > 10 && this.x < 440 ? true : false;
  },

  checkBackWall: function() {
    return this.y < 440 ? true : false;
  },

  // checkForAdjacentBubbles: function () {
  //   this.x === bubble.x - 11 || this.x === bubble.x + 11 || this.y === bubble.y - 11 ? true : false;
  // },

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
    // this.checkInBounds() ? this.x = this.x + 5 : this;
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

function getRandomColor(self, context) {
  var colors = ['deeppink', 'navy', 'mediumslateblue', 'darkgreen', 'darkorange']

  var gradient = context.createRadialGradient(self.x, self.y, self.iRadius, self.x, self.y, self.oRadius);
  gradient.addColorStop(0, 'ivory');
  gradient.addColorStop(1, colors[Math.floor(Math.random()*colors.length)]);

  return gradient;
}

module.exports = Shooter;
