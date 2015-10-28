const Bubble = require('./bubble');

function Board (width, height, canvas, context) {
  this.width   = width;
  this.height  = height;
  this.grid    = [];
  this.canvas  = canvas;
  this.context = context;
  this.shooter = new Bubble(225, 440, 10, 0, canvas, context);
  this.bubbles = [this.shooter];

// create rows in grid matrix, push bubbles onto those rows
  for (var r = 0; r < 10; r += 1) {
    var row = [];
    for (var c = 0; c < 20; c += 1) {
      var newBubble = new Bubble(c * 22 + 15, r * 22 + 11, 10, 0, canvas, context);
      this.bubbles.push(newBubble);
      row.push(newBubble);
    }
    this.grid.push(row);
  }

// create empty rows in grid matrix to fill remaining spots on board
  for (var r = 10; r < 20; r += 1) {
    var row = new Array(20);
    this.grid.push(row);
  }

  this.grid[19][10] = this.shooter;
}

Board.prototype.render = function() {
  this.drawBubbles();
};

Board.prototype.drawBubbles = function() {
  var ableToMoveForward = this.bubbleCanMoveForward.bind(this);
  var grid = this.grid;
  var board = this;

  this.bubbles.forEach(function(bubble) {
    var nextMoveCoords = bubble.nextMove();
    var currentBox = [Math.floor((bubble.x - 15) / 22), Math.floor((bubble.y - 11) / 22)];
    var nextBox = [Math.floor((nextMoveCoords.x - 15) / 22), Math.floor((nextMoveCoords.y - 11) / 22)];

    if(bubble.velocity > 0 && ableToMoveForward(bubble, currentBox, nextBox)) {
      grid[currentBox[1]][currentBox[0]] = null;
      grid[nextBox[1]][nextBox[0]] = bubble;
      bubble.travel();
    } else if(bubble.velocity > 0) {
      bubble.velocity = 0;
      var color = bubble.color;
      var adjacentBubbles = new Set(board.findAdjacentBubbles(currentBox, color));
      if (adjacentBubbles.size >= 3) {
        board.removeBubbles(adjacentBubbles);
      }
    }
    bubble.draw();
  });
};

Board.prototype.removeBubbles = function(adjacentBubbles) {
  var bubbles = this.bubbles;

  for (let bubble of adjacentBubbles.values()) {
    bubbles.splice(bubbles.indexOf(bubble), 1);
  };

  this.grid.forEach(function(row) {
    for (var i = 0; i < row.length; i++) {
      if(adjacentBubbles.has(row[i])) {
        row[i] = null;
      }
    };
  });
  return this;
}

Board.prototype.findAdjacentBubbles = function(currentBox, color, foundBubbles) {
  var row = this.grid[currentBox[1]];
  if(typeof foundBubbles === "undefined") {
    foundBubbles = [];
  }

  if(!row) {
    return foundBubbles;
  } else {
    var currentBubble = this.grid[currentBox[1]][currentBox[0]];
    if(!currentBubble) {
      return foundBubbles;
    } else if(foundBubbles.indexOf(currentBubble) > 0) {
      return foundBubbles;
    } else if(currentBubble.color !== color) {
      return foundBubbles;
    } else {
      var matches = foundBubbles.concat([currentBubble]);
      var lookUp = this.findAdjacentBubbles([currentBox[0], currentBox[1] - 1], color, matches);
      var lookLeft = this.findAdjacentBubbles([currentBox[0] - 1, currentBox[1]], color, matches);
      var lookRight = this.findAdjacentBubbles([currentBox[0] + 1, currentBox[1]], color, matches);
      return matches.concat(lookUp, lookRight, lookLeft);
    }
  }
};

Board.prototype.shooterWasPressed = function() {
  var oldShooter = this.shooter;
  oldShooter.velocity = 2;

  manageCount(this);
  createNewShooter(this, oldShooter);

  return this;
};

Board.prototype.bubbleCanMoveForward = function(bubble, currentBox, nextBox) {
  if (currentBox[0] === nextBox[0] && currentBox[1] === nextBox[1]) {
    return true;
  } else if (!this.grid[nextBox[1]][nextBox[0]]) {
    return true;
  } else {
    return false;
  };
};

Board.prototype.insideBackWall = function(nextMoveCoords) {
  return nextMoveCoords.y > 10 ? true : false;
};

Board.prototype.moveLeft = function() {
  this.shooter.moveLeft();
};

Board.prototype.moveRight = function() {
  this.shooter.moveRight();
};

Board.counter = (function() {
  var counter = 0;
  function change(value) {
    return counter += value;
  }
  return {
    increment: function() {
      return change(1);
    },
    value: function() {
      return counter;
    },
    reset: function() {
      return counter = 0;
    }
  };
})();

function createNewShooter(self, oldShooter) {
  var newBubble = new Bubble(oldShooter.x, 440, 10, 0, self.canvas, self.context);
  self.shooter = newBubble;
  self.bubbles.push(newBubble);
}

function manageCount(self) {
  Board.counter.increment();
  if (Board.counter.value() === 5) {
    addNewBubbles(self);
    Board.counter.reset();
  }
}

function addNewBubbles(self) {
  moveBubblesDown(self);
  var row = [];

  for (var c = 0; c < 20; c += 1) {
    var newBubble = new Bubble(c * 22 + 15, 11, 10, 0, self.canvas, self.context);
    self.bubbles.push(newBubble);
    row.push(newBubble);
  }

  self.grid.unshift(row);
  self.shooter.y = 430;
}

function moveBubblesDown(self) {
  self.bubbles.forEach(function(bubble) {
    return bubble.y = bubble.y + 22;
  });
}

module.exports = Board;
