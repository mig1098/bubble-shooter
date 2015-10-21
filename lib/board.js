function Board (width, height) {
  this.width = width;
  this.height = height;
}

Board.prototype = {
  spaceBarWasPressed: function(shooter) {
    shooter.shoot();
  }
}

module.exports = Board;
