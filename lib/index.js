'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');

var BASE_URL = 'https://raw.githubusercontent.com/shinnn/node-cwebp-bin/2b4b0836753e748f899209c86a37a378bc9fdcd9/vendor/';

var bin = new BinWrapper()
  .src(BASE_URL + 'osx/cwebp', 'darwin')
  .src(BASE_URL + 'linux/cwebp', 'linux')
  .src(BASE_URL + 'win/cwebp.exe', 'win32')
  .dest(path.join(__dirname, '../vendor'))
  .use(process.platform === 'win32' ? 'cwebp.exe' : 'cwebp');

module.exports = bin;
