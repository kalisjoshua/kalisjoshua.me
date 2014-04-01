var assert = require('chai').assert,
    router = require('../../resources/router');

describe('Module: router', function () {
  it('should be a function', function () {
    assert.equal('function', typeof router, 'is a function');
  });

  it('should register routes', function () {
    router('happy', function testFn1(one, two) {
      return [one, two];
    });

    assert.deepEqual([1, 2], router('happy')(1, 2));
  });
});
