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
  checkBounds: function() {
    return this.x > 10 && this.x < 440 ? true : false;
  },

  moveLeft: function () {
    this.checkBounds() ? this.x = this.x - 5 : this;
    return this;
  },

  moveRight: function () {
    this.checkBounds() ? this.x = this.x + 5 : this;
    return this;
  }
}

module.exports = Shooter;
