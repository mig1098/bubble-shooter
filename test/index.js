const chai = require('chai');
const assert = chai.assert;
const Bubble = require('../lib/bubble');
const Board = require('../lib/board');
const Shooter = require('../lib/shooter');

describe('Bubble', function() {
  it('should instantiate with x & y coordinates, and a radius', function () {
    let bubble = new Bubble(0, 0, 2);

    assert.equal(bubble.x, 0);
    assert.equal(bubble.y, 0);
    assert.equal(bubble.radius, 2);
  });
});

// bubbles can instantiate, see neighbors, see if they're on the edge
// the board can find its boundaries
// the shooter can move along the x axis, can determine if it's at the edge, is always fixed on y axis, can be shot

describe('Board', function () {
  it('can find its own boundaries', function () {
    let board = new Board(400, 400);

    assert.equal(board.height, 400);
    assert.equal(board.width, 400);
  });
});

describe('Shooter', function () {
  it('should instantiate at the bottom of the canvas with x & y coordinates, and a radius', function () {
    let shooter = new Shooter(225, 440, 10);

    assert.equal(shooter.x, 225);
    assert.equal(shooter.y, 440);
    assert.equal(shooter.radius, 10);
  });

  it('can move left', function () {
    let shooter = new Shooter(225, 440, 10);
    shooter.moveLeft();

    assert.equal(shooter.x, 220);
    assert.equal(shooter.y, 440);
  });

  it('can move right', function () {
    let shooter = new Shooter(225, 440, 10);
    shooter.moveRight();

    assert.equal(shooter.x, 230);
    assert.equal(shooter.y, 440);
  });

  it('can move back and forth', function () {
    let shooter = new Shooter(225, 440, 10);
    shooter.moveLeft().moveLeft().moveRight();

    assert.equal(shooter.x, 220);
    assert.equal(shooter.y, 440);
  });

  it('cannot move past the left boundary', function () {
    let shooter = new Shooter(10, 440, 10);
    shooter.moveLeft();

    assert.equal(shooter.x, 10);
  });
});
