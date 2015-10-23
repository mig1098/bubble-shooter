const Shooter = require('./shooter')
const Bubble = require('./bubble')

function Board (width, height) {
  this.width = width;
  this.height = height;
}

Board.prototype = {
  spaceBarWasPressed: function(shooter) {
    // var bubble = new Bubble
    // shooter.shoot();

    // WIP
    var bubble = new Bubble(shooter.x, shooter.y, 10);

    bubble.draw();
    return this;
  },

  moveLeft: function(shooter) {
    shooter.moveLeft();
  },

  moveRight: function(shooter) {
    shooter.moveRight();
  }
}

module.exports = Board;
