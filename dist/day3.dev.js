"use strict";

exports.__esModule = true;

var fs = require("fs");

var input = fs.readFileSync('day3.txt', 'utf8').split('\r\n');
var test = input.slice(0, 5);
var priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
/**
 * Grab Rucksack ; vGFhvGvvSdfwqhqvmCPnlFPnCNPcCFcWcr
 * Split into compartments
 * Find common items
 * Sum the priority
*/

function calc_score(_char) {
  return priorities.indexOf(_char) + 1;
}

function step1(data) {
  var common_denom = [];
  var score = 0;

  for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    var len = row.length;
    var slice = len / 2;
    var comp1 = row.slice(0, slice);
    var comp2 = row.slice(slice);

    for (var _a = 0, _b = Array.from(comp1); _a < _b.length; _a++) {
      var _char2 = _b[_a];

      if (comp2.includes(_char2)) {
        common_denom.push(_char2);
        break;
      }
    }
  }

  console.log(common_denom);

  for (var _c = 0, common_denom_1 = common_denom; _c < common_denom_1.length; _c++) {
    var denom = common_denom_1[_c];
    var cscore = calc_score(denom);
    score += cscore;
  }

  return score;
}

var tmp = step1(test);
console.log(tmp);
console.log('done');