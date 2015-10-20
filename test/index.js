const chai = require('chai');
const assert = chai.assert;
const Bubble = require('../lib/bubble');

describe('Bubble', function() {
  it('should instantiate with x & y coordinates, a radius, and an end angle', function () {
    let bubble = new Bubble(0, 0, 2, 4);

    assert.equal(bubble.x, 0);
    assert.equal(bubble.y, 0);
    assert.equal(bubble.radius, 2);
    assert.equal(bubble.eAngle, 4);
  });
});
