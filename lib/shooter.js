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
  moveLeft: function () {
    this.x = this.x - 5;
    return this;
  },

  moveRight: function () {
    this.x = this.x + 5;
    return this;
  }
}

module.exports = Shooter;
