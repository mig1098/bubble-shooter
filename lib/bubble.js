function Bubble(x, y, r, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = 2 * Math.PI
  this.iRadius = 0.2;
  this.oRadius = 10;
  this.canvas  = canvas;
  this.context = context;
  this.color   = getRandomColor(this, context);
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

function getRandomColor(self, context) {
  var colors = ['deeppink', 'navy', 'mediumslateblue', 'darkgreen', 'darkorange']

  var gradient = context.createRadialGradient(self.x, self.y, self.iRadius, self.x, self.y, self.oRadius);
  gradient.addColorStop(0, 'ivory');
  gradient.addColorStop(1, colors[Math.floor(Math.random()*colors.length)]);

  return gradient;
}

module.exports = Bubble;
