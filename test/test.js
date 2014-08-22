/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('cwebp()', function () {
  afterEach(function (callback) {
    rm(path.join(__dirname, 'tmp'), callback);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should rebuild the cwebp binaries', function (callback) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('https://webp.googlecode.com/files/libwebp-0.4.0.tar.gz')
      .cmd('node -p "require(\'fs\').chmodSync(\'./configure\', \'755\')"')
      .cmd('./configure && make && mv ./examples/.libs/cwebp ' + path.join(tmp, 'cwebp'));

    builder.build(function (error) {
      if (error) {
        callback(error);
        return;
      }

      assert(fs.existsSync(path.join(tmp, 'cwebp')));
      callback();
    });
  });

  it('should return path to binary and verify that it is working', function (callback) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.png'),
      '-o',
      path.join(__dirname, 'tmp/test.webp')
    ];

    binCheck(binPath, args, function (error, works) {
      callback(assert.equal(works, true));
    });
  });

  it('should convert PNG to WebP', function (callback) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.png'),
      '-o',
      path.join(__dirname, 'tmp/test-png.webp')
    ];

    execFile(binPath, args, function () {
      callback(assert(fs.statSync(path.join(__dirname, 'tmp/test-png.webp'))));
    });
  });

  it('should convert JPG to WebP', function (callback) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.jpg'),
      '-o',
      path.join(__dirname, 'tmp/test-jpg.webp')
    ];

    execFile(binPath, args, function () {
      callback(assert(fs.statSync(path.join(__dirname, 'tmp/test-jpg.webp'))));
    });
  });
});