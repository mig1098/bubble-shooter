const Bubble = require('./bubble');

function Board (width, height) {
  this.width = width;
  this.height = height;
}

Board.prototype = {
  shooterWasPressed: function(shooter) {
    // var bubble = new Bubble(shooter.x, shooter.y, shooter.context, shooter.canvas);
    // bubble.travel();
    shooter.travel();
  },

  moveLeft: function(shooter) {
    shooter.moveLeft();
  },

  moveRight: function(shooter) {
    shooter.moveRight();
  }
}

Board.renderNewElements = function(el) {
  console.log('new elements', el);
}

module.exports = Board;
