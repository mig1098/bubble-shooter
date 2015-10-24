const chai   = require('chai');
const assert = chai.assert;
const Board  = require('../lib/board');
const Bubble  = require('../lib/bubble');

describe('Board', function () {

  // beforeEach(function() {
  //   sinon.spy(Bubble.prototype, 'draw');
  // });

  it('can find its own boundaries', function () {
    let board = new Board(450, 450);

    assert.equal(board.height, 450);
    assert.equal(board.width, 450);
  });

  it('creates a new bubble upon shoot', function () {
    let board = new Board(450, 450);
    let shooter = new shooter(225, 10, 10);
    // let bubble = new Bubble(225, 10, 10);

    board.shooterWasPressed(shooter);

    assert(spy.calledOnce());
  });

  it.skip('changes the shooter color upon shoot', function () {
    let board = new Board(450, 450);
    let shooter = new shooter(225, 10, 10);

    board.shoot(shooter);

    // assert that color has changed
  });

  // afterEach(function() {
  //   Bubble.prototype.draw.restore();
  // });
});
