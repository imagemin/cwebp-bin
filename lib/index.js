'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');

var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-cwebp-bin/master/vendor/osx/cwebp', 'darwin')
  .src('https://raw.github.com/1000ch/node-cwebp-bin/master/vendor/linux/cwebp', 'linux')
  .src('https://raw.github.com/1000ch/node-cwebp-bin/master/vendor/win/cwebp.exe', 'win32')
  .dest(path.join(__dirname, 'vendor'))
  .use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');

module.exports = bin;
