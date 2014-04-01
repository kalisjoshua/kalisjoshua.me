var assert = require('chai').assert,
    ofType = require('../../resources/ofType');

describe('Module: ofType', function () {
  it('should be a function', function () {
    assert(ofType, 'is defined');
    assert.equal('function', typeof ofType, 'is a function');
  });

  it('should test for types (Positive)', function () {
    assert(ofType(/array/i, []), 'Boolean');
    assert(ofType(/boolean/i, false), 'Boolean');
    assert(ofType(/function/i, function () {}), 'Boolean');
    assert(ofType(/number/i, 9), 'Number');
    assert(ofType(/object/i, {}), 'Object');
    assert(ofType(/regexp/i, /regex/), 'RegExp');
    assert(ofType(/string/i, 'hello'), 'String');
  });

  it('should test for types (Negative)', function () {
    assert(!ofType(/boolean/i, 'false'), 'Boolean');
    assert(!ofType(/number/i, [9]), 'Number');
    assert(!ofType(/object/i, true), 'Object');
    assert(!ofType(/regexp/i, '/regex/'), 'RegExp');
    assert(!ofType(/string/i, /regex/), 'String');
  });

  it('should have sugar method for String', function () {
    assert(ofType.String, 'is defined');
    assert.equal('function', typeof ofType.String, 'is a function');
    assert(ofType.String('hello'), 'String is a String');
    assert(!ofType.Object('hello'), 'String is not an Object');
  });
});
