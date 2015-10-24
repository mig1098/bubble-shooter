const chai    = require('chai');
const assert  = chai.assert;
const Board   = require('../lib/board');
const Bubble  = require('../lib/bubble');

describe('Bubble', function() {
  it('should instantiate at the bottom of the canvas with x & y coordinates, and a radius', function() {
    let shooter = new Bubble(225, 440, 10);

    assert.equal(shooter.x, 225);
    assert.equal(shooter.y, 440);
    assert.equal(shooter.radius, 10);
  });

  it('can move left', function() {
    let shooter = new Bubble(225, 440, 10);
    shooter.moveLeft();

    assert.equal(shooter.x, 220);
    assert.equal(shooter.y, 440);
  });

  it('can move right', function() {
    let shooter = new Bubble(225, 440, 10);
    shooter.moveRight();

    assert.equal(shooter.x, 230);
    assert.equal(shooter.y, 440);
  });

  it('can move back and forth', function() {
    let shooter = new Bubble(225, 440, 10);
    shooter.moveLeft().moveLeft().moveRight();

    assert.equal(shooter.x, 220);
    assert.equal(shooter.y, 440);
  });

  it('cannot move past the left boundary', function() {
    let shooter = new Bubble(15, 440, 10);
    shooter.moveLeft();
    assert.equal(shooter.x, 10);

    shooter.moveLeft();
    assert.equal(shooter.x, 10);
  });

  it('can move right if on the left boundary', function() {
    let shooter = new Bubble(10, 440, 10);
    shooter.moveRight();

    assert.equal(shooter.x, 15);
  });

  it('cannot move past the right boundary', function() {
    let shooter = new Bubble(435, 440, 10);
    shooter.moveRight();
    assert.equal(shooter.x, 440);

    shooter.moveRight();
    assert.equal(shooter.x, 440);
  });

  it('can move left if on the right boundary', function() {
    let shooter = new Bubble(440, 440, 10);
    shooter.moveLeft();

    assert.equal(shooter.x, 435);
  });

  it('shoots the ball when the spacebar is pressed', function() {
    let board   = new Board(450, 450);
    let shooter = new Bubble(225, 440, 10);

    board.shooterWasPressed(shooter);

    assert.notEqual(shooter.y, 10);
    assert.equal(shooter.y, 11);
  });

  it('stops traveling when it hits the opposite wall', function () {
    let board   = new Board(450, 450);
    let shooter = new Bubble(225, 11, 10);

    board.shooterWasPressed(shooter).shooterWasPressed(shooter);

    assert.equal(shooter.y, 10);
  });

  it('stops traveling when it hits another bubble', function () {
    let board   = new Board(450, 450);
    let bubble  = new Bubble(225, 439, 10);
    let shooter  = new Bubble(225, 440, 10);

    board.shooterWasPressed(shooter);

    assert.equal(shooter.y, 440);
  });

  it.skip('becomes a bubble when it hits another bubble', function() {
    let board   = new Board(450, 450);
    let bubble  = new Bubble(225, 440, 10);
    let shooter = new Bubble(225, 440, 10);

    board.shooterWasPressed(shooter);

    assert.equal(shooter.y, 11);
    assert.equal(bubble.y, 12);
  });
});
