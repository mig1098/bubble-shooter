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
    this.bubbles.forEach(function(bubble) {
      bubble.draw();
    });
  },

  shooterWasPressed: function() {
    var newShooter = new Bubble(this.shooter.x, this.shooter.y, 10, 0, this.canvas, this.context);
    this.shooter.travel();

    this.shooter = newShooter;
    this.bubbles.push(newShooter);
    return this.bubbles;
  },

  moveLeft: function() {
    this.shooter.moveLeft();
  },

  moveRight: function() {
    this.shooter.moveRight();
  }
}

module.exports = Board;
