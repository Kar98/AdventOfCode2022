"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync('day6.txt', 'utf8');
var test1 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
var test2 = 'nppdvjthqldpwncqszvftbrmjlhg';
var test3 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
var test4 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
var test5 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
var test6 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
var test7 = 'nppdvjthqldpwncqszvftbrmjlhg';
var test8 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
function count_chars(char, input) {
    var chars = input.split('');
    var match = 0;
    for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
        var c = chars_1[_i];
        if (char == c) {
            match++;
        }
    }
    return match;
}
function part1(data) {
    var total_chars = 4;
    var _loop_1 = function (i) {
        var section = data.slice(i, i + 4);
        var window = section.split('');
        if (window.every(function (a) { return count_chars(a, section) == 1; })) {
            return { value: total_chars };
        }
        total_chars++;
    };
    for (var i = 0; i < data.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function part2(data) {
    var total_chars = 14;
    var _loop_2 = function (i) {
        var section = data.slice(i, i + 14);
        var window = section.split('');
        if (window.every(function (a) { return count_chars(a, section) == 1; })) {
            return { value: total_chars };
        }
        total_chars++;
    };
    for (var i = 0; i < data.length; i++) {
        var state_2 = _loop_2(i);
        if (typeof state_2 === "object")
            return state_2.value;
    }
}
//console.log('part1 : '+part1(input));
console.log('part2 : ' + part2(input));
