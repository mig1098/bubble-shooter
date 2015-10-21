const chai    = require('chai');
const assert  = chai.assert;
const Shooter = require('../lib/shooter');

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
