const chai   = require('chai');
const assert = chai.assert;
const Bubble = require('../lib/bubble');
const Board = require('../lib/board');

describe('Bubble', function() {
  it('should instantiate with x & y coordinates, and a radius', function () {
    let bubble = new Bubble(0, 0, 2);

    assert.equal(bubble.x, 0);
    assert.equal(bubble.y, 0);
    assert.equal(bubble.radius, 2);
  });

  describe('the Shooter', function() {
    it('should instantiate at the bottom of the canvas with x & y coordinates, and a radius', function() {
      let shooter = new Bubble(225, 440, 10);

      assert.equal(shooter.x, 225);
      assert.equal(shooter.y, 440);
      assert.equal(shooter.radius, 10);
    });

    it('can move left', function() {
      let shooter = new Bubble(235, 440, 10);
      shooter.moveLeft();

      assert.equal(shooter.x, 213);
      assert.equal(shooter.y, 440);
    });

    it('can move right', function() {
      let shooter = new Bubble(235, 440, 10);
      shooter.moveRight();

      assert.equal(shooter.x, 257);
      assert.equal(shooter.y, 440);
    });

    it('can move back and forth', function() {
      let shooter = new Bubble(235, 440, 10);
      shooter.moveLeft().moveLeft().moveRight();

      assert.equal(shooter.x, 213);
      assert.equal(shooter.y, 440);
    });

    it('cannot move past the left boundary', function() {
      let shooter = new Bubble(40, 440, 10);
      shooter.moveLeft();
      assert.equal(shooter.x, 18);
    });

    it('can move right if on the left boundary', function() {
      let shooter = new Bubble(20, 440, 10);
      shooter.moveRight();

      assert.equal(shooter.x, 42);
    });

    it('cannot move past the right boundary', function() {
      let shooter = new Bubble(411, 440, 10);
      shooter.moveRight();
      assert.equal(shooter.x, 433);

      shooter.moveRight();
      assert.equal(shooter.x, 433);
    });

    it('can move left if on the right boundary', function() {
      let shooter = new Bubble(433, 440, 10);
      shooter.moveLeft();

      assert.equal(shooter.x, 411);
    });

    it('shoots the ball when the spacebar is pressed', function() {
      let board = new Board(450, 450);
      let oldBubbleCount = board.bubbles.length;
      let shooter = new Bubble(225, 10, 10);

      board.shooterWasPressed(shooter);
      let newBubbleCount = board.bubbles.length

      assert.equal(oldBubbleCount, newBubbleCount - 1);
    });

    it('stops traveling when it hits another bubble', function () {
      let board   = new Board(450, 450);
      let bubble  = new Bubble(225, 439, 10);
      let shooter  = new Bubble(225, 440, 10);

      board.shooterWasPressed(shooter);

      assert.equal(shooter.y, 440);
    });
  });
});
