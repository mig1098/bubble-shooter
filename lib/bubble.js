const GetRandomColor = require('./shared/bubble-colors');
const DrawBubble     = require('./shared/draw-bubbles');
const Board          = require('./board');

function Bubble(x, y, r, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.radius  = r;
  this.sAngle  = 0;
  this.eAngle  = 2 * Math.PI
  // this.iRadius = 0.2;
  // this.oRadius = 10;
  this.canvas  = canvas;
  this.context = context;
  // this.color   = GetRandomColor(this, context);
  this.color = 'magenta';
}

Bubble.prototype = {
  draw: function() {
    DrawBubble(this);
    return this;
  },

  travel: function() {
    // Board.renderNewElements(this);

    while (this.y > 10) {
      this.y = this.y - 1;
    }
    // console.log('this.y', this.y);
    return this;
  }
};

module.exports = Bubble;
