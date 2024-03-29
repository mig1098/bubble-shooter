const chai   = require('chai');
const assert = chai.assert;
const Board  = require('../lib/board');
const Bubble  = require('../lib/bubble');

describe('Board', function () {

  it('can find its own boundaries', function () {
    let board = new Board(450, 450);

    assert.equal(board.height, 450);
    assert.equal(board.width, 450);
  });

  it('renders initial elements on page load', function() {
    let board = new Board(450, 450);

    assert.equal(201, board.bubbles.length);
  });

  it('instantiates with a grid', function() {
    let board = new Board(450, 450);

    assert(board.grid);
    assert.equal(20, board.grid.length);
  });

  it('creates a new bubble upon shoot', function () {
    let board = new Board(450, 450);
    let oldBubbleCount = board.bubbles.length;
    let shooter = new Bubble(225, 10, 10);

    board.shooterWasPressed(shooter);
    let newBubbleCount = board.bubbles.length

    assert.equal(oldBubbleCount, newBubbleCount - 1);
  });

  it('adds new bubbles every five times the shooter is pressed', function() {
    let board = new Board(450, 450);
    let oldBubbleCount = board.bubbles.length;
    let shooter = new Bubble(225, 10, 10);

    for (var i = 0; i < 5; i++) {
      board.shooterWasPressed(shooter);
    }

    let newBubbleCount = board.bubbles.length

    assert.notEqual(oldBubbleCount, newBubbleCount);
  });

  it('determines if the shooter can move forward', function() {
    let board = new Board(450, 450);
    let shooter = new Bubble(225, 10, 10);

    assert.equal(true, board.bubbleCanMoveForward(shooter, 0, 0));
  });
});
