"use strict";

exports.__esModule = true;

var fs = require("fs");

var input = fs.readFileSync('day4.txt', 'utf8').split('\r\n');
var test = input.slice(0, 9);
test = ['12-13,13-61'];

var Pair =
/** @class */
function () {
  function Pair(l, h) {
    this.low = l;
    this.high = h;
  }

  return Pair;
}();

function part1(data) {
  var matches = 0;
  var rowcount = 1;

  for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    var pairs = row.split(',');
    var split = pairs[0].split('-');
    var pair1 = new Pair(parseInt(split[0]), parseInt(split[1]));
    split = pairs[1].split('-');
    var pair2 = new Pair(parseInt(split[0]), parseInt(split[1]));

    if (pair1.low <= pair2.low && pair1.high >= pair2.high) {
      matches++;
      continue; //console.log(`Pair1 within ${pair1.low}-${pair1.high} . Row ${rowcount}`);
    }

    if (pair2.low <= pair1.low && pair2.high >= pair1.high) {
      matches++; //console.log(`Pair2 within ${pair2.low}-${pair2.high} . Row ${rowcount}`);
    }

    rowcount++;
  }

  return matches;
}

function part2(data) {
  var matches = 0;
  var rowcount = 1;

  var _loop_1 = function _loop_1(row) {
    var pairs = row.split(',');
    var split = pairs[0].split('-');
    var pair1 = new Pair(parseInt(split[0]), parseInt(split[1]));
    split = pairs[1].split('-');
    var pair2 = new Pair(parseInt(split[0]), parseInt(split[1]));
    var pair1arr = [];
    var pair2arr = [];

    for (var i = 0; i <= pair1.high - pair1.low; i++) {
      pair1arr.push(pair1.low + i);
    }

    if (pair1.low == pair1.high) {
      pair1arr.push(pair1.low);
    }

    for (var i = 0; i <= pair2.high - pair2.low; i++) {
      pair2arr.push(pair2.low + i);
    }

    if (pair2.low == pair2.high) {
      pair2arr.push(pair2.low);
    }

    var isinarr = pair1arr.some(function (a) {
      return pair2arr.includes(a);
    });

    if (isinarr) {
      matches++; //console.log(`Found at${rowcount}`);
    }

    rowcount++;
  };

  for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
    var row = data_2[_i];

    _loop_1(row);
  }

  return matches;
}

console.log("Total matches : " + part2(test));