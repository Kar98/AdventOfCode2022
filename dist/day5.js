"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = fs.readFileSync('day5.txt', 'utf8').split('\r\n');
var ship = file.slice(0, 8);
var instructions = file.slice(10);
var stacks = { '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': [] };
var test = instructions.slice(0, 1);
/**
    [B]             [B] [S]
    [M]             [P] [L] [B] [J]
    [D]     [R]     [V] [D] [Q] [D]
    [T] [R] [Z]     [H] [H] [G] [C]
    [P] [W] [J] [B] [J] [F] [J] [S]
[N] [S] [Z] [V] [M] [N] [Z] [F] [M]
[W] [Z] [H] [D] [H] [G] [Q] [S] [W]
[B] [L] [Q] [W] [S] [L] [J] [W] [Z]
 1   2   3   4   5   6   7   8   9

move 3 from 5 to 2
move 5 from 3 to 1
move 4 from 4 to 9
 */
/** */
function init_stack() {
    for (var i = ship.length - 1; i >= 0; i--) {
        var insert_at_row = 1;
        var row = ship[i];
        for (var cursor = 1; cursor < row.length; cursor += 4) {
            var char = row.charAt(cursor);
            if (char != ' ') {
                stacks["" + insert_at_row].push(char);
            }
            insert_at_row++;
        }
        insert_at_row = 1;
    }
}
function do_instruction(move, from, to) {
    for (var i = 0; i < move; i++) {
        var pop = stacks["" + from].pop();
        if (!(pop == 'undefined' || pop == undefined) == true) {
            stacks["" + to].push(pop);
        }
    }
}
function do_multi_move(move, from, to) {
    var tmpstack = [];
    for (var i = 0; i < move; i++) {
        var pop = stacks["" + from].pop();
        tmpstack.push(pop);
    }
    for (var i = 0; i < move; i++) {
        var shift = tmpstack.pop();
        stacks["" + to].push(shift);
    }
}
function part1(ship, instructions) {
    // Parse ships into stacks
    init_stack();
    for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
        var inst = instructions_1[_i];
        var matches = inst.match(/move (\d+) from (\d) to (\d)/);
        do_instruction(parseInt(matches[1]), matches[2], matches[3]);
    }
    var output = '';
    for (var i = 1; i < 10; i++) {
        var char = stacks["" + i].pop();
        output += char;
    }
    console.log(output);
}
function part2(ship, instructions) {
    init_stack();
    console.log(test);
    for (var _i = 0, instructions_2 = instructions; _i < instructions_2.length; _i++) {
        var inst = instructions_2[_i];
        var matches = inst.match(/move (\d+) from (\d) to (\d)/);
        do_multi_move(parseInt(matches[1]), matches[2], matches[3]);
    }
    var output = '';
    for (var i = 1; i < 10; i++) {
        var char = stacks["" + i].pop();
        output += char;
    }
    console.log(output);
}
//part1(ship, instructions);
part2(ship, instructions);
