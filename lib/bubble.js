const GetRandomColor = require('./shared/bubble-colors');
const DrawBubble     = require('./shared/draw-bubbles');

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
  this.color   = GetRandomColor(this, context);
}

Bubble.prototype = {
  draw: function() {
    DrawBubble(this);
    return this;
  },

  drop: function() {
    this.y = this.y + 2;
    return this;
  }
};

module.exports = Bubble;
