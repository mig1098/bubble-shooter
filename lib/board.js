function Board (width, height) {
  this.width = width;
  this.height = height;
}

Board.prototype = {
  spaceBarWasPressed: function(shooter) {
    shooter.shoot();
    return this;
  }
}

// board has a notion of which game it belongs to, eg. this.game = game
// should the shooter have to ask the board to check if there are bubbles
// if free spaces, move ball

module.exports = Board;
