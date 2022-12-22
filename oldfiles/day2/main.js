"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync('input.txt', 'utf8').split('\r\n');
var test = ['C Z', 'A Y', 'C Z', 'B Z', 'C Y'];
// A = rock 
// B = paper 
// C = Scissors 
function round1(data) {
    var score = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var row = data_1[_i];
        var s = row.split(' ');
        var s0 = s[0];
        var s1 = s[1];
        if (s1 == 'X') {
            score += 1;
            if (s0 == 'A') {
                score += 3;
            }
            if (s0 == 'C') {
                score += 6;
            }
        }
        else if (s1 == 'Y') {
            score += 2;
            if (s0 == 'B') {
                score += 3;
            }
            if (s0 == 'A') {
                score += 6;
            }
        }
        else if (s1 == 'Z') {
            score += 3;
            if (s0 == 'C') {
                score += 3;
            }
            if (s0 == 'B') {
                score += 6;
            }
        }
    }
}
// X = lose
// Y = draw
// Z = win
function round2(data) {
    var score = 0;
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var row = data_2[_i];
        var s = row.split(' ');
        var s0 = s[0];
        var s1 = s[1];
        if (s1 == 'X') {
            if (s0 == 'A') {
                // play scis C
                score += 3;
            }
            else if (s0 == 'B') {
                // play rock A
                score += 1;
            }
            else if (s0 == 'C') {
                // play paper B
                score += 2;
            }
        }
        if (s1 == 'Y') {
            score += 3;
            if (s0 == 'A') {
                // play rock C
                score += 1;
            }
            else if (s0 == 'B') {
                // play paper A
                score += 2;
            }
            else if (s0 == 'C') {
                // play sci B
                score += 3;
            }
        }
        if (s1 == 'Z') {
            score += 6;
            if (s0 == 'A') {
                // play paper C
                score += 2;
            }
            else if (s0 == 'B') {
                // play scis A
                score += 3;
            }
            else if (s0 == 'C') {
                // play rock B
                score += 1;
            }
        }
    }
    return score;
}
var score = round2(input);
console.log(score);
