const Bubble = require('./bubble');

function Board (width, height, canvas, context) {
  this.width   = width;
  this.height  = height;
  this.bubbles = [];
  this.grid    = [];
  this.canvas  = canvas;
  this.context = context;
  this.shooter = new Bubble(225, 440, 10, 0, canvas, context)

// create rows in grid matrix, push bubbles onto those rows
  for (var r = 0; r < 10; r += 1) {
    var row = [];
    for (var c = 0; c < 20; c += 1) {
      var newBubble = new Bubble(c * 22 + 15, r * 22 + 11, 10, 0, canvas, context)
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
    console.log(this.grid);
}

Board.prototype = {
  render: function() {
    this.shooter.draw();
    this.drawBubbles();
  },

  drawBubbles: function() {
    var ableToMoveForward = this.bubbleCanMoveForward.bind(this);

    this.bubbles.forEach(function(bubble) {
      if(bubble.velocity > 0 && ableToMoveForward(bubble)) {
        bubble.travel();
      }
      bubble.draw();
    });
  },

  shooterWasPressed: function() {
    var newBubble = new Bubble(this.shooter.x, this.shooter.y, 10, 2, this.canvas, this.context);
    this.bubbles.push(newBubble);

    Board.counter.increment();
    if (Board.counter.value() === 5) {
      addNewBubbles(this);
      Board.counter.reset();
    }
    return this;
  },

  bubbleCanMoveForward: function(bubble) {
    var nextMoveCoords = bubble.nextMove();
    return this.insideBackWall(nextMoveCoords) && this.hasNoCollisions(nextMoveCoords);
  },

  hasNoCollisions: function(nextMoveCoords) {
    return !this.bubbles.find(function(bubble) {
      var xBound = bubble.x + (bubble.radius * 2 + 1);
      var yBound = bubble.y + (bubble.radius * 2 + 1);
      var inX = (nextMoveCoords.x >= bubble.x && nextMoveCoords.x < xBound);
      var inY = (nextMoveCoords.y >= bubble.y && nextMoveCoords.y < yBound);
      return inX && inY;
    });
  },

  insideBackWall: function(nextMoveCoords) {
    return nextMoveCoords.y > 10 ? true : false;
  },

  moveLeft: function() {
    this.shooter.moveLeft();
  },

  moveRight: function() {
    this.shooter.moveRight();
  }
}

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

function addNewBubbles(self) {
  moveBubblesDown(self);

  for (var i = 11; i < 450; i += 22) {
    self.bubbles.push(new Bubble(i, 11, 10, 0, self.canvas, self.context));
  }
}

function moveBubblesDown(self) {
  self.bubbles.forEach(function(bubble) {
    return bubble.y = bubble.y + 22;
  });
}

module.exports = Board;
