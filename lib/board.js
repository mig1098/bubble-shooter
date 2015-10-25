const Bubble = require('./bubble');

function Board (width, height, canvas, context) {
  this.width = width;
  this.height = height;
  this.bubbles = [];
  this.canvas = canvas;
  this.context = context;

  this.shooter = new Bubble(225, 440, 10, 0, canvas, context)

  for (var j = 0; j < 225; j += 22) {
    for (var i = 11; i < 430; i += 22) {
      this.bubbles.push(new Bubble(i, 11 + j, 10, 0, canvas, context));
    }
  }
}

Board.prototype = {
  render: function() {
    this.drawShooter();
    this.drawBubbles();
  },

  drawShooter: function() {
    this.shooter.draw();
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

    counter.increment();
    if (counter.value() > 5) {
      moveBubblesDown(this);
      addNewBubbles(this);
      counter.reset();
    }

    return this.bubbles;
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

var counter = (function() {
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

function moveBubblesDown(self) {
  self.bubbles.forEach(function(bubble) {
    return bubble.y = bubble.y + 22;
  });
}

function addNewBubbles(self) {
  for (var i = 11; i < 450; i += 22) {
    self.bubbles.push(new Bubble(i, 11, 10, 0, self.canvas, self.context));
  }
}

module.exports = Board;
