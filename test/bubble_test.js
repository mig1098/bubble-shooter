const chai = require('chai');
const assert = chai.assert;
const Bubble = require('../lib/bubble');

describe('Bubble', function() {
  it('should instantiate with x & y coordinates, and a radius', function () {
    let bubble = new Bubble(0, 0, 2);

    assert.equal(bubble.x, 0);
    assert.equal(bubble.y, 0);
    assert.equal(bubble.radius, 2);
  });
});
