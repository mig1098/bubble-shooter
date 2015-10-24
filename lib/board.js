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
    this.shooter.travel();
    // var newBubble = createnewBubble();
    // bubbles.push(newBubble);
    // new Bubble(shooter.x, shooter.y, shooter.context, shooter.canvas).draw();
  },

  moveLeft: function() {
    this.shooter.moveLeft();
  },

  moveRight: function() {
    this.shooter.moveRight();
  }
}

module.exports = Board;
