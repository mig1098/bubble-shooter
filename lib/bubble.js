function Bubble(x, y, r, eAngle, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = eAngle;
  this.canvas  = canvas;
  this.context = context;
  this.color   = getRandomColor();
}

Bubble.prototype = {
  draw: function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);

    this.context.fillStyle = this.color;
    this.context.fill();

    return this;
  },

  drop: function() {
    this.y = this.y + 2;
    return this;
  }
};

function getRandomColor() {
  var colors = ['purple', 'navy', '#0E8065', 'white', 'yellow']
  return colors[Math.floor(Math.random()*colors.length)];
}

module.exports = Bubble;
