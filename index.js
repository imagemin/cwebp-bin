'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */
var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-cwebp-bin/master/vendor/osx/cwebp', 'darwin')
  .src('https://raw.github.com/1000ch/node-cwebp-bin/master/vendor/linux/cwebp', 'linux')
  .src('https://raw.github.com/1000ch/node-cwebp-bin/master/vendor/win/cwebp.exe', 'win64')
  .dest(path.join(__dirname, 'vendor'))
  .use('cwebp');

/**
 * Only run check if binary doesn't already exist
 */
fs.exists(bin.use(), function (exists) {
  if (!exists) {
    var args = [
      path.join(__dirname, 'test/fixtures/test.png'),
      '-o',
      path.join(__dirname, 'test/fixtures/test.webp')
    ];

    bin.run(args, function (error) {
      if (error) {
        console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

        var builder = new BinBuild()
          .src('https://webp.googlecode.com/files/libwebp-0.4.0.tar.gz')
          .make('./configure && make && mkdir -p ' + bin.dest() + ' && mv ./examples/.libs/cwebp ' + bin.use());

        return builder.build(function (error) {
          if (error) {
            return console.log(chalk.red('✗ ' + error));
          }

          console.log(chalk.green('✓ cwebp built successfully'));
        });
      }

      console.log(chalk.green('✓ pre-build test passed successfully'));
    });
  }
});

/**
 * Module exports
 */
module.exports.path = bin.use();