"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync('day3.txt', 'utf8').split('\r\n');
var test = input.slice(0, 9);
var priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
/**
 * Grab Rucksack ; vGFhvGvvSdfwqhqvmCPnlFPnCNPcCFcWcr
 * Split into compartments
 * Find common items
 * Sum the priority
*/
function calc_score(char) {
    return priorities.indexOf(char) + 1;
}
function step1(data) {
    var common_denom = [];
    var score = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var row = data_1[_i];
        var len = row.length;
        var slice = (len) / 2;
        var comp1 = row.slice(0, slice);
        var comp2 = row.slice(slice);
        for (var _a = 0, _b = Array.from(comp1); _a < _b.length; _a++) {
            var char = _b[_a];
            if (comp2.includes(char)) {
                common_denom.push(char);
                break;
            }
        }
    }
    console.log(common_denom);
    for (var _c = 0, common_denom_1 = common_denom; _c < common_denom_1.length; _c++) {
        var denom = common_denom_1[_c];
        score += calc_score(denom);
    }
    return score;
}
function step2(data) {
    var common_denom = [];
    for (var i = 0; i < data.length; i = i + 3) {
        var rucksack1 = data[i];
        var rucksack2 = data[i + 1];
        var rucksack3 = data[i + 2];
        for (var _i = 0, _a = Array.from(rucksack1); _i < _a.length; _i++) {
            var char = _a[_i];
            if (rucksack2.includes(char) && rucksack3.includes(char)) {
                common_denom.push(char);
                break;
            }
        }
    }
    console.log("Total numbers " + common_denom.length);
    var totalscore = 0;
    for (var _b = 0, common_denom_2 = common_denom; _b < common_denom_2.length; _b++) {
        var denom = common_denom_2[_b];
        totalscore += calc_score(denom);
    }
    console.log(common_denom);
    return totalscore;
}
console.log(step2(input));
console.log('done');
