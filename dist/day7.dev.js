"use strict";

exports.__esModule = true;

var fs = require("fs");

var input = fs.readFileSync('day7.txt', 'utf8').split('\r\n');
var test1 = input.slice(0, 39);
var newval = {
  '/blgtdv/bjlcfcfq/pwcvj/bjp/drsgv/': 'test'
};
console.log(newval);

function go_up(path) {
  for (var i = path.length - 2; i >= 0; i--) {
    if (path.charAt(i) == '/') {
      var val = path.slice(0, i + 1);
      return val;
    }
  }

  return '/';
}

function parse(data) {
  var linenum = 0;
  var path = '';
  var files = {
    '/': []
  };

  for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var line = data_1[_i];
    linenum++;

    if (line.at(0) == '$') {
      // User command
      if (line.includes('$ cd')) {
        var dir = line.split('$ cd ')[1];

        if (dir == '..') {
          // go up
          path = go_up(path);
        } else if (dir == '/') {
          // go to root
          path = '/';
        } else {
          // go in
          path += dir + '/';
        }
      } else if (line.includes('$ ls')) {//
      }
    } else {
      // Output
      if (line.startsWith('dir')) {
        var match = line.match(/dir (.*)/);
        var dir = match[1];
        var local = path + dir + '/';

        if (local in files == false) {
          files[local] = [];
        }
      } else {
        try {
          files[path].push(line);
        } catch (_a) {
          throw new Error('Could not push onto path ' + path);
        }
      }
    }

    console.log(linenum);
  }

  return files;
  console.log('path : ' + path);
  console.log('files : ' + JSON.stringify(files));
}

function build_subdirs(tree) {
  var struct = {};

  for (var k in tree) {
    if (k == '/') {// skip
    } else {
      struct[k] = [];

      for (var sub in tree) {
        if (sub != k && sub.startsWith(k)) {
          struct[k].push(sub);
        }
      }
    }
  }

  return struct;
}

function part2(data) {}

var parsed = parse(input);
var subtrees = build_subdirs(parsed);
console.log(JSON.stringify(subtrees));