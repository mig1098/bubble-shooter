const chai   = require('chai');
const assert = chai.assert;
const Board  = require('../lib/board');

describe('Board', function () {
  it('can find its own boundaries', function () {
    let board = new Board(400, 400);

    assert.equal(board.height, 400);
    assert.equal(board.width, 400);
  });
});
