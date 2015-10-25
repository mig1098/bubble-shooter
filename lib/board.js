const Bubble = require('./bubble');

function Board (width, height, canvas, context) {
  this.width   = width;
  this.height  = height;
  this.canvas  = canvas;
  this.context = context;
  this.shooter = new Bubble(225, 440, 10, 0, canvas, context)
  this.bubbles = [this.shooter];

  for (var j = 0; j < 225; j += 22) {
    for (var i = 11; i < 430; i += 22) {
      this.bubbles.push(new Bubble(i, 11 + j, 10, 0, canvas, context));
    }
  }
}

Board.prototype = {
  render: function() {
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
    var oldShooter = this.shooter;
    oldShooter.velocity = 2;

    incrementCount(this);
    createNewShooter(this, oldShooter);
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

function incrementCount(self) {
  Board.counter.increment();
  if (Board.counter.value() === 5) {
    Board.counter.reset();
    addNewBubbles(self);
  }
}

function createNewShooter(self, oldShooter) {
  var newBubble = new Bubble(oldShooter.x, 440, 10, 0, self.canvas, self.context);
  self.shooter = newBubble;
  self.bubbles.push(newBubble);
  return self.bubbles;
}

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
  self.shooter.y = 430;
}

module.exports = Board;
